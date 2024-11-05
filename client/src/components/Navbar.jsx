import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar(){
    const location = useLocation();
    const rutasSinItem = ['/register', '/login'];
    const rutasSinItemProfile = ['/products', '/profile'];
    const ocultarItem = rutasSinItem.includes(location.pathname);
    const ocultarItemProfile = rutasSinItemProfile.includes(location.pathname);
    return(
    <nav className="bg-dark-blue pa3">
      <div className="flex justify-between items-center">
        <NavLink to="/"><img src="https://offcorss.vtexassets.com/arquivos/header__logo-offcorss.png" alt="" /></NavLink>
        
        <div className="flex">  
            {!ocultarItem && (      
            <NavLink 
                className={({ isActive }) => 
                isActive ? "link light-blue f5 fw5 ml3" : "link white f5 fw5 ml3"
                }
                to="/products"
            >
                Listado de productos
            </NavLink>
            )}
            {!ocultarItem && (      
            <NavLink 
                className={({ isActive }) => 
                isActive ? "link light-blue f5 fw5 ml3" : "link white f5 fw5 ml3"
                }
                to="/reporte"
            >
                Reporte de productos
            </NavLink>
            )}
          {!ocultarItem && (
          <NavLink 
            className={({ isActive }) => 
              isActive ? "link light-blue f5 fw5 ml3" : "link white f5 fw5 ml3"
            }
            to="/profile"
          >
            Perfil
          </NavLink>
          )}
          {!ocultarItem && (
          <NavLink 
            className={({ isActive }) => 
              isActive ? "link light-blue f5 fw5 ml3" : "link white f5 fw5 ml3"
            }
            to="/logout"
          >
            Salir
          </NavLink>
          )}
        </div>
      </div>
    </nav>
    )
}
export default Navbar