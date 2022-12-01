import mysql from "mysql2"

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tmp'
}).promise()

export async function checkuser(username, password){
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ? AND password = ?", 
    [username, password])
    return rows
} 
