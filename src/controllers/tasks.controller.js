import Task from '../models/task.model.js'
const axios = require ('axios')


export const getTasks = async (req, res) => {}

export const createTasks = async (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://offcorss.myvtex.com/api/catalog_system/pub/products/search/',
        headers: { }
    };
      
    axios.request(config)
      .then((response) => {
    console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getTask = async (req, res) => {}

export const updateTask = async (req, res) => {}

export const deleteTask = async (req, res) => {}