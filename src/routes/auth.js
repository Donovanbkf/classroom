const express = require('express');
const router = express.Router()
const { signin, login, list } = require('../controller/auth') 
const {validateUserCreate, validateUserLogin} = require('../validators/users')

router.post('/signin', validateUserCreate,signin)

router.post('/login', login)

router.get('/', list)

module.exports = router