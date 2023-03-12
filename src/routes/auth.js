const express = require('express');
const router = express.Router()
const { signin, login, list } = require('../controller/auth') 

router.post('/signin', signin)

router.post('/login', login)

router.get('/', list)

module.exports = router