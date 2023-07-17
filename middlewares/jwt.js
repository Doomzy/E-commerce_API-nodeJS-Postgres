import JWT from 'jsonwebtoken'
import pool from "../database/db.js"

function generateToken(id, isAdmin){
    return JWT.sign({id, isAdmin}, process.env.JWT_KEY, {expiresIn: 5*24*60*60})
}

function verifyToken(req, res, next){
    const getToken= req.headers.token
    if(getToken){
        JWT.verify(getToken, process.env.JWT_KEY, (err, user)=>{
            err? 
            res.status(403).json({'err': "Invalid Token"})
            : 
            req.user= user
            next()
        })
    }else{
        res.status(401).json({'err': "Not authenticated!"})
    }
}

function isAuthorized(req, res, next){
    verifyToken(req, res, ()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json({'err': "Not Authorized!"})
        }
    })
}

function isAdmin(req, res, next){
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json({'err': "Not Authorized!"})
        }
    })
}

async function userOwnOrder(req, res, next){
    const uid= req.user.id
    const orderId= req.params.oid
    pool.query(
        "SELECT * FROM orders WHERE id=$1 AND uid=$2",
        [orderId, uid],
        (err, result)=> {
            if(err)        
                res.status(500).json({"err": err.message})
            else if(result.rowCount > 0 || req.user.isAdmin){
                req.order= result.rows[0]
                next()
            }else 
                res.status(403).json({"err": 'Not Authorized!'})
        }
    )
}

export {generateToken, verifyToken, isAuthorized, isAdmin, userOwnOrder}