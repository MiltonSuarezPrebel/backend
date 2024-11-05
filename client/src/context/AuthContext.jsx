import {createContext, useState, useContext, useEffect} from 'react'
import { registerRequest, loginRequest } from '../api/auth'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

export const useAuth = ()=> {
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("Use auth debe estar en provider")
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            //console.log(error.response)
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res.data);
            Cookies.set("id", res.data.id, {
                expires: 7,
              });
            localStorage.setItem('token', res.data.id); 
            setIsAuthenticated(true);            
            setUser(res.data);
            
            
        } catch (error) {
            //console.log(error.response)
            setErrors(error.response.data)
        }
    }

    useEffect (() => {
        if (errors.length > 0) {
            const timer = setTimeout(()=> {
                setErrors([])
            }, 20000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() =>{
        const cookies = Cookies.get()
        console.log(cookies)
        

        if (cookies.token){
            console.log(cookies.token)
        }
    }, [])

    return (
        <AuthContext.Provider 
            value={{
                signup,
                signin,
                user,
                isAuthenticated,
                errors
            }}>
                {children}
        </AuthContext.Provider> 
    );   
}