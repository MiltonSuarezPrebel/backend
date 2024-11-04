import Task from '../models/task.model.js'
import axios from 'axios';



export const getProducts = async (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://offcorss.myvtex.com/api/catalog_system/pub/products/search/',
        headers: { }
    };
    
    try {
        const response = await axios.request(config);
        // Envía la respuesta JSON al cliente
        res.json(response.data);
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        res.status(500).json({ error: 'Error al obtener los datos de la API' });
    }    
}

export const createTasks = async (req, res) => {}

export const getTask = async (req, res) => {}

export const updateTask = async (req, res) => {}

export const deleteTask = async (req, res) => {}