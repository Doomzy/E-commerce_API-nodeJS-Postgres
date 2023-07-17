import Stripe from "stripe"

const stripeKey = process.env.STRIPE_KEY
const stripe= new Stripe(stripeKey)

async function stripePayment(req, res){
    const items= req.body.items
    const payment= await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        currency: 'usd',
        line_items: items.map(item=>{
            return {
                price_data: {
                    currency: "usd",
                    product_data:{
                        name: item.name
                    },
                    unit_amount: item.price
                },
                quantity: item.quantity
            }
        }),
        success_url: 'http://localhost:5000/',
        cancel_url: 'http://localhost:5000/'
    })
    res.json(payment.url)
}

export {stripePayment}