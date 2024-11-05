import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
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

  return (
    <div>
        <article className="bg-white center mw6 ba b--black-10 mv4 tc">
            <div className="pv2 ph3 content-center">
                <h1 className="f3 f2-m f2-l">{producto.productName}</h1>
            </div>
            <img src={producto.items[0].images[0].imageUrl} className="w-100 db" alt="Closeup photo of a tabby cat yawning."/>
            <div className="pa3 tl">
                <p className="lh-title f4">{producto.productTitle}</p>
                <small className="gray db pv2">{producto.brand}</small>
            </div>
        </article>
    </div>
  );
};

export default ProductDetail;