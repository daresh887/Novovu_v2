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
export async function checkcash(username){
    const [rows] = await pool.query("SELECT cash FROM users WHERE username = ?", 
    [username])
    return rows
} 
export async function checkusername(id){
    const [rows] = await pool.query("SELECT username FROM users WHERE id = ?", 
    [id])
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
    const result = await pool.query("INSERT users (username, password, email, cash) VALUES (?, ?, ?, ?)", 
    [username, password, email, 500])
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
export async function getitems(){
    const [rows] = await pool.query("SELECT * FROM items")
    return rows
}
export async function changecash(amount, username){
    const result = await pool.query("UPDATE users SET cash = ? WHERE username = ?", 
    [amount, username])
    return result
}
export async function additem(name, desc, price, quantity){
    const result = await pool.query("INSERT items (name, desc, price, quantity) VALUES (?, ?, ?, ?)", 
    [name, desc, price, quantity])
    return result
} 
export async function searchuser(username){
    const [rows] = await pool.query("SELECT * FROM users WHERE username LIKE ?", 
    [`${username}%`])
    return rows
} 
export async function getuserinfo(username, password){
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", 
    [username, password])
    return rows
} 
export async function getiteminfo(id){
    const [rows] = await pool.query("SELECT * FROM items WHERE id = ?", 
    [id])
    return rows
} 