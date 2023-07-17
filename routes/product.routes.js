import { Router } from "express"
import {getAllProducts, addProduct, getSingleProduct, updateProduct, deleteProduct} 
    from '../controllers/product.js'
import { isAdmin } from '../middlewares/jwt.js'

const router= Router()

router.get('', getAllProducts)
router.post('', isAdmin, addProduct)
router.get('/:id', getSingleProduct)
router.delete('/:id', isAdmin, deleteProduct)
router.put('/:id', isAdmin, updateProduct)

export default router