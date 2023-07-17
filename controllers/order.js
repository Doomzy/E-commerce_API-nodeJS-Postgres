import pool from "../database/db.js"

async function createOrder(req, res){
    const uid= req.user.id
    const {amount, address, phone, card_number}= req.body
    await pool.query(
        `INSERT INTO 
        orders (uid, total_amount, address, phone, card_number) 
        VALUES($1,$2,$3,$4,$5) 
        RETURNING *`,
        [uid, amount, address, phone, card_number],
        (err, result)=>{
            err?
                res.status(500).json({ "err": err.message })
            :
                res.status(200).json({...result.rows[0]})
        }
    )
}

async function deleteOrder(req, res){
    const oid= req.params.oid
    await pool.query(
        "DELETE FROM orders WHERE id= $1", 
        [oid],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": "Order Deleted Successfully"})
            : 
                res.status(404).json({"err": 'Object not found'})
        }
    )
}

async function updateOrder(req, res){
    const oid= req.params.oid
    const status= req.body.status
    await pool.query(
        "UPDATE orders SET status=$1 WHERE id= $2", 
        [status, oid],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": "Order Updated Successfully"})
            : 
                res.status(404).json({"err": 'Object not found'})
        }
    )
}

async function userOrders(req, res){
    const uid= req.params.id
    await pool.query(
        "SELECT * FROM orders WHERE uid= $1", 
        [uid],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({...result.rows})
            : 
                res.status(404).json({"err": 'No Orders Yet'})
        }
    )
}
export {createOrder, deleteOrder, updateOrder, userOrders}