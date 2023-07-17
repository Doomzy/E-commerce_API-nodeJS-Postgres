import pool from "../database/db.js"
import bcrypt from 'bcrypt'
import {generateToken} from '../middlewares/jwt.js'

async function createUser(req, res){
    try{
        const {first_name, last_name, email, password, image}= req.body
        const salt= await bcrypt.genSalt()
        const encryptedPass= await bcrypt.hash(password, salt)
        await pool.query(
            `INSERT INTO users (first_name, last_name, email, password, image) 
            VALUES($1, $2, $3, $4, $5)`,
            [first_name, last_name, email, encryptedPass, image]
        )
        res.status(201).json({"msg": "User Created Successfully"})
    }catch(err){
        res.status(500).json({"err": err.message})
    }
    
}

async function loginUser(req, res){
    const {email, lpassword}= req.body
    try{
        const findUser= await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if(findUser.rows[0]){
            let myUser= findUser.rows[0]
            const isAuthenticated= await bcrypt.compare(lpassword, myUser.password)
            const utoken= generateToken(
                myUser.id, myUser.isadmin
            )
            const { password, ...rest } = myUser
            isAuthenticated? res.status(200).json({utoken, ...rest})
            :res.status(401).json({"msg": "Wrong login Info."})
        }else{
            res.status(401).json({"msg": "Wrong login Info."})
        }
    }catch(err){
        res.status(500).json({"err": err.message})
    }
}

export {createUser, loginUser}