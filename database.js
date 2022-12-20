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

export async function getuserbyid(id){
    const [rows] = await pool.query("SELECT users.username FROM users JOIN messages ON users.id = messages.user_id WHERE messages.id = ?", 
    [id])
    return rows
}
export async function getusernamebyid(username){
    const [rows] = await pool.query("SELECT id FROM users WHERE username = ?", 
    [username])
    return rows
}

export async function adduser(username, password, email){
    const result = await pool.query("INSERT users (username, password, email) VALUES (?, ?, ?)", 
    [username, password, email])
    return result
} 

export async function addmessages(message, user_id){
    const result = await pool.query("INSERT messages (messages, user_id) VALUES (?, ?)", 
    [message, user_id])
    return result
} 

export async function getmessages(){
    const [rows] = await pool.query("SELECT * FROM messages ORDER BY id DESC LIMIT 5 ")
    return rows
}

