const pool = require('../config/database')
const { matchedData } = require("express-validator");
const {encrypt} = require('../helpers/handleBcrypt')

const signin = async (req, res)=> {
    req = matchedData(req)
    if (req.role === 'profesor'){
        req.cantidad = 0
    }
    req.password = await encrypt(req.password) 
    await pool.query('Insert into user set ?', [req])
    res.send(req)
}

const login = async (req, res)=> {
    req = matchedData(req)
    const usuario = await pool.query('Select * from user where username = ?', [req.username])
    if (usuario.length > 0) {
        return res.send('logueado')
    }
    res.send('no logueado')
}


const list = async (req, res)=> {
    const users = await pool.query('Select * from user')
    res.send(users[0])
}

module.exports = { signin, login, list }