import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
import stripeRouter from './routes/stripe.routes.js'

const app= express()
dotenv.config()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, ()=>{
    console.log(`API running on port: ${process.env.PORT}`)
})

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/stripe', stripeRouter)