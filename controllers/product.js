import pool from "../database/db.js"
import format from "pg-format"

async function getAllProducts(req, res){
    await pool.query(
        "SELECT * FROM products",
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :
                res.json({'products':result.rows})
        }
    )
}

async function addProduct(req, res){
    const products= req.body
    const insertQuery= format(
        'INSERT INTO products (title, description, price, image) VALUES %L RETURNING *'
        , products
    )
    await pool.query(insertQuery,
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :
                res.status(201).json({"msg": "Product Inserted", ...result.rows[0]})
        }
    )
}

async function getSingleProduct(req, res){
    await pool.query(
        "SELECT * FROM products WHERE id = $1", 
        [req.params.id],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :
                res.status(200).json(result.rows[0])
        }
    )
}

async function updateProduct(req, res){
    const {title, description, price, inStock}= req.body
    await pool.query(
        `UPDATE products
        SET title= $2, description= $3, price= $4, inStock= $5 WHERE id = $1`, 
        [req.params.id, title, description, price, inStock],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": "Product Updated Successfully"})
            : 
                res.status(404).json({"err": 'Object not found'})
        }
    )
}

async function deleteProduct(req, res){
    await pool.query(
        "DELETE FROM products WHERE id = $1", 
        [req.params.id],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": "Product Updated Successfully"})  
            : 
                res.status(404).json({"err": 'Object not found'})
        }
    )
}

export {getAllProducts, addProduct, getSingleProduct, updateProduct, deleteProduct}