import pg from "pg";
import dotenv from 'dotenv'

dotenv.config()

const pool= new pg.Pool({
    database: "e_commerce_db",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

export default pool