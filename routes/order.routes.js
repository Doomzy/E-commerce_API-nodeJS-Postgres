import { Router } from "express"
import {getOrder, addOrderItems} from  '../controllers/order_items.js'
import {createOrder, deleteOrder, updateOrder, userOrders}  from '../controllers/order.js'
import { verifyToken, isAdmin, userOwnOrder, isAuthorized } from '../middlewares/jwt.js'

const router= Router()
//order
router.post('/new', verifyToken, createOrder)
router.delete('/:oid', isAdmin, deleteOrder)
router.put('/:oid', isAdmin, updateOrder)
router.get('/all/:id', isAuthorized, userOrders)
//items
router.post('/items/:oid', [verifyToken, userOwnOrder], addOrderItems)
router.get('/:oid', [verifyToken, userOwnOrder], getOrder)
export default router
