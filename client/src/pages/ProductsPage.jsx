import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Configurar Axios para consumir la API
      axios.get('https://backend-mongodb-w0sd.onrender.com/api/products')
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

   
      
    return (
        <div className='mt4'> 
            {productos.map((producto) => (
            <div className="row" key={producto.productId}>
                <div className="column">
                    <a href={`/products/${producto.productId}`} className="card">
                            <h3 className='ml0 fw6 f4 mb-2'>{producto.productName}</h3>
                            <img className="db ba b--black-10" alt="Frank Ocean Blonde Album Cover"
                                src={producto.items[0].images[0].imageUrl}
                                />
                            <p><strong>Marca: </strong>{producto.brand}</p>
                            <p>{producto.productTitle}</p>
                    </a>
                </div>
            </div>
            ))}   
        </div>
    );
  };
  
  export default Productos;