import { Router } from "express"
import {
        addCartItem, removeCartItem, updateCartItem, 
        getCart, deleteCart
    } from '../controllers/cart_item.js'
import { verifyToken } from '../middlewares/jwt.js'

const router= Router()
//cart
router.get('/', verifyToken, getCart)
router.delete('/', verifyToken, deleteCart)
//cart items
router.post('/item', verifyToken, addCartItem)
router.delete('/item', verifyToken, removeCartItem)
router.put('/item', verifyToken, updateCartItem)

export default router
