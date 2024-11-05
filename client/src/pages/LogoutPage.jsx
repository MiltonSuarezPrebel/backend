import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Eliminar el token de autenticación al montar el componente
    localStorage.removeItem('authToken');
    
    // Redirigir al usuario al login
    navigate('/login');
  }, [navigate]);

  return null; // No es necesario renderizar nada
};

export default LogoutPage;