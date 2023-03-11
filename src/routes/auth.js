const express = require('express');
const router = express.Router()
const pool = require('../config/database')

router.post('/signin', async (req, res)=> {
    const user = {
        dni: 1234,
        username: 'user1',
        password: 'password',
        fullname: 'fullname',
        role: 'admin',
    }
    console.log(await pool.query('Insert into user set ?', [user]))
    res.send('lol')
})

router.post('/login', async (req, res)=> {
    const user = {
        username: 'user1',
        password: 'password',
    }
    console.log(await pool.query('Insert into user set ?', [user]))
    res.send('lol')
})

router.get('/', async (req, res)=> {
    const users = await pool.query('Select * from user')
    res.send(users)
})

module.exports = router