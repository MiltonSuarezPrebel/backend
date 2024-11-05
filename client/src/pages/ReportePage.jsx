import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportePage = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Configurar Axios para consumir la API
      axios.get('http://localhost:4000/api/products')
        .then((response) => {
          setProductos(response.data); // Guardar datos en el estado
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

  // Función para generar y descargar el archivo CSV
  const descargarCSV = () => {
    // Cabecera del archivo CSV
    const headers = ["ID", "Nombre", "Titulo", "Marca", "Imagen"];
    // Mapear los datos para crear cada fila del CSV
    const rows = productos.map(item => [item.productId, item.productName, item.productTitle, item.brand, item.items[0].images[0].imageUrl]);

    // Crear una cadena en formato CSV
    const csvContent = [
      headers.join(','), // Encabezados
      ...rows.map(row => row.join(',')) // Filas de datos
    ].join('\n');

    // Crear un blob y usar FileSaver para descargarlo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'tabla_registros.csv');
  };

  return (
    <div className='w-100 mw9 center'>
        <h1 className="f3 f2-m f2-l ml-8">Lista de Productos</h1>
        <button className='ml-8 f6 link dim br2 ph3 pv2 mb2 dib white bg-black' onClick={descargarCSV} style={{ marginTop: '10px' }}>Descargar CSV</button>
        <div className="pa4">
            <div className="overflow-auto">
                <table className="f6 w-100 mw9 center">
                    <thead>
                    <tr className='stripe-dark '>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">ID</th>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Nombre</th>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Titulo</th>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Marca</th>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Imagen</th>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="lh-copy">
                        {productos.map((producto) => (
                            <tr key={producto.productId} className='stripe-dark'>
                                <td className="pv3 pr3 bb b--black-20">{producto.productId}</td>
                                <td className="pv3 pr3 bb b--black-20">{producto.productName}</td>
                                <td className="pv3 pr3 bb b--black-20">{producto.productTitle}</td>
                                <td className="pv3 pr3 bb b--black-20">{producto.brand}</td>
                                <td className="pv3 pr3 bb b--black-20">{producto.items[0].images[0].imageUrl}</td>
                                <td className="pv3 pr3 bb b--black-20">
                                <a href={`/reporte/${producto.productId}`} >
                                <button className='f6 link dim br1 ph3 pv2 mb2 dib white bg-purple'>Ver producto</button>
                                </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default ReportePage;