import pool from "../database/db.js"
import format from "pg-format"

async function addOrderItems(req, res){
    const {items}= req.body
    const insertQuery= format(
        'INSERT INTO order_items (orderid, productid, quantity) VALUES %L RETURNING *'
        , items
        )
    await pool.query(insertQuery,
        (err, result)=>{
            err?
                res.status(500).json({"err": err.message})
            :
                res.status(200).json({...result.rows})
        }
    )
}

async function getOrder(req, res){
    const uorder= req.order
    const uid= req.user.id
    await pool.query(
        `SELECT order_items.productid, products.title, 
            products.price, order_items.quantity 
        FROM order_items 
        JOIN products 
            ON order_items.productid= products.id
        JOIN orders
            ON orders.id= order_items.orderid
        WHERE order_items.orderid= $1 AND orders.uid=$2`,
        [uorder.id, uid],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount == 0? 
                res.status(500).json({"err": "Not Autherized or Empty Order"})
            :
                res.status(200).json({...result.rows, "order":uorder})
        }
    )
}

export {getOrder, addOrderItems}