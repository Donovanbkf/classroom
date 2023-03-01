const express = require('express');
const router = express.Router()
const pool = require('../config/database')

router.post('/', async (req, res)=> {
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

router.get('/', async (req, res)=> {
    console.log(await pool.query('Select * from user'))
    res.send('lol')
})

module.exports = router