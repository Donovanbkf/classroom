const pool = require('../config/database')
const { matchedData } = require("express-validator");

const signin = async (req, res)=> {
    console.log(req.body)
    req = matchedData(req)
    console.log(req)
    // const userr = await pool.query('Insert into user set ?', [user])
    res.send('user')
}

const login = async (req, res)=> {
    const user = {
        username: 'user1',
        password: 'password',
    }
    const usuario = await pool.query('Select * from user where username = ?', [user.username])
    if (usuario.length > 0) {
        return res.send('logueado')
    }
    res.send('no logueado')
}


const list = async (req, res)=> {
    const users = await pool.query('Select * from user')
    console.log(rows)
    res.send(users)
}

module.exports = { signin, login, list }