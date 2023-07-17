import pool from "../database/db.js"

async function addCartItem(req, res){
    const uid= req.user.id
    const {productId, quantity}= req.body
    await pool.query(
        "INSERT INTO cart_items (uid, productid, quantity) VALUES($1, $2, $3) RETURNING *",
        [uid, productId, quantity],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :
                res.status(201).json({"msg": 'Product Added to Cart', ...result.rows[0]})
        }
    )            

}

async function removeCartItem(req, res){
    const uid= req.user.id
    const {productId}= req.body
    await pool.query(
        "DELETE FROM cart_items WHERE uid=$1 AND productid=$2",
        [uid, productId],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": 'Cart Item Deleted'})
            : 
                res.status(404).json({"err": 'Object not found'})
        }
    )            
}

async function updateCartItem(req, res){
    const uid= req.user.id
    const {productId, quantity}= req.body
    await pool.query(
        "UPDATE cart_items SET quantity=$3 WHERE uid=$1 AND productid=$2",
        [uid, productId, quantity],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": 'Cart Item Updated'})
            : 
                res.status(404).json({"err": 'Object not found'})
        }
    )            
}
async function getCart(req, res){
    const uid= req.user.id
    await pool.query(
        `SELECT products.id AS ProductID, products.title, products.price, 
            products.image, cart_items.quantity
        FROM cart_items 
        JOIN products 
            ON cart_items.productid= products.id
        WHERE cart_items.uid= $1`,
        [uid],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({...result.rows})
            : 
                res.status(200).json({"err": 'Cart is Empty'})
        }
    )
}

async function deleteCart(req, res){
    const uid= req.user.id
    await pool.query(
        "DELETE FROM cart_items WHERE uid= $1", 
        [uid],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": "Cart Deleted Successfully"})
            : 
                res.status(404).json({"err": 'Object not found'})
        }
    )
}

export { addCartItem, removeCartItem, updateCartItem, getCart, deleteCart}