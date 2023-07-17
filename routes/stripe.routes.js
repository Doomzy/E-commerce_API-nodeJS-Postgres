import { Router } from "express"
import {stripePayment} from '../controllers/stripe.js'
import { verifyToken } from '../middlewares/jwt.js'

const router= Router()

router.get('/checkout', verifyToken, stripePayment)

export default router