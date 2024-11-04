import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getTask, getProducts, createTasks, updateTask, deleteTask } from '../controllers/tasks.controller.js'

const router = Router()

router.get('/products', authRequired, getProducts)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, createTasks)
router.delete('/tasks/:id', authRequired, deleteTask)
router.put('/tasks/:id', authRequired, updateTask)

export default router