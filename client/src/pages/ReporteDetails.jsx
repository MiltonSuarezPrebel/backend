import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';

const ReporteDetail = () => {
  // Obtener el id del producto desde los parámetros de la URL
  const { id } = useParams();

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Configurar Axios para consumir la API
      axios.get('https://backend-mongodb-w0sd.onrender.com/api/products')
        .then((response) => {
          setProductos(response.data); // Guardar datos en el estado
          console.log(response.data)
          setLoading(false);           // Termina el estado de carga
        })
        .catch((error) => {
          console.error('Error al obtener productos:', error);
          setError(error);
          setLoading(false);
        });
    }, []);
  
    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar los productos.</p>;

  // Buscar el producto correspondiente al id
  const producto = productos.find((p) => p.productId === id);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const descargarCSV = () => {
    // Cabecera del archivo CSV
    const headers = ["ID", "Nombre", "Titulo", "Marca", "Imagen"];
    // Mapear los datos para crear cada fila del CSV
    const datos = [producto.productId, producto.productName, producto.brand, producto.productTitle, producto.items[0].images[0].imageUrl];

    // Crear una cadena en formato CSV
    const csvContent = [
        headers.join(','), // Encabezados
        datos.join(',') // Detalles del producto
      ].join('\n');
    // Crear un blob y usar FileSaver para descargarlo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `producto_${producto.productId}.csv`);
  };

  const imprimirDetalle = () => {
    window.print();
  };

  return (
    <div className='w-100 mw9 center'>
        <h1 class="f3 f2-m f2-l ml-8">Lista de Productos</h1>        
        <div class="pa4">
            <div class="overflow-auto">
                <table class="f6 w-100 mw9 center" cellspacing="0">
                    <thead>
                    <tr className='stripe-dark '>
                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">ID</th>
                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Nombre</th>
                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Titulo</th>
                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Marca</th>
                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Imagen</th>
                        <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Acciones</th>
                    </tr>
                    </thead>
                    <tbody class="lh-copy">
                        <tr className='stripe-dark'>
                            <td class="pv3 pr3 bb b--black-20">{producto.productId}</td>
                            <td class="pv3 pr3 bb b--black-20">{producto.productName}</td>
                            <td class="pv3 pr3 bb b--black-20">{producto.productTitle}</td>
                            <td class="pv3 pr3 bb b--black-20">{producto.brand}</td>
                            <td class="pv3 pr3 bb b--black-20">{producto.items[0].images[0].imageUrl}</td>
                            <td class="pv3 pr3 bb b--black-20">
                            <button className='ml-8 f6 link dim br2 ph3 pv2 mb2 dib white bg-black' onClick={descargarCSV} style={{ marginTop: '10px' }}>Descargar CSV</button>
                            <button className='ml-8 f6 link dim br2 ph3 pv2 mb2 dib white bg-black' onClick={imprimirDetalle} style={{ padding: '10px'}}>Imprimir</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default ReporteDetail;