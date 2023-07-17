import pool from "../database/db.js"

async function getUser(req, res){
    const uid= req.params.id
    await pool.query(
        "SELECT * FROM users WHERE id=$1", 
        [uid],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            : 
            res.status(200).json({...result.rows[0]})
        }
    )
}

async function getAllUsers(req, res){
    await pool.query(
        "SELECT * FROM users",
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            : 
                res.status(200).json({"Users": result.rows})
        }
    )
}

async function updateUser(req, res){
    const uid= req.params.id
    const {first_name, last_name, image}= req.body
    await pool.query(
        `UPDATE users 
        SET first_name=$2, last_name=$3, image=$4 WHERE id = $1
        `,
        [uid, first_name, last_name, image],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": "User Updated Successfully"})
            : 
                res.status(404).json({"err": 'User not found'})
        }    
    )
}

async function adminStatus(req, res){
    const uid= req.params.id
    const {isAdmin}= req.body
    await pool.query(
        `UPDATE users 
        SET isAdmin=$2 
        WHERE id = $1
        `,
        [uid, isAdmin],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": "User Updated Successfully"})
            : 
                res.status(404).json({"err": 'User not found'})
        }    
    )
}

async function deleteUser(req, res){
    const uid= req.params.id
    await pool.query(
        "DELETE * FROM users WHERE id=$1", 
        [uid],
        (err, result)=> {
            err?
                res.status(500).json({"err": err.message})
            :result.rowCount > 0? 
                res.status(200).json({"msg": "User Deleted Successfully"})
            : 
                res.status(404).json({"err": 'User not found'})
        }    
    )
}

export {getUser, getAllUsers, updateUser, deleteUser, adminStatus}