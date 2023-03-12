const pool = require('../config/database')

const signin = async (req, res)=> {
    const user = {
        dni: 1234,
        username: 'user1',
        password: 'password',
        fullname: 'fullname',
        role: 'admin',
    }
    console.log(await pool.query('Insert into user set ?', [user]))
    res.send('lol')
}

const login = async (req, res)=> {
    const user = {
        username: 'user12',
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