const express = require('express');
const router = express.Router()
const { signin, login, list } = require('../controller/auth') 
const {validateUserCreate, validateUserLogin} = require('../validators/users')
const {isAuthenticated} = require('../middleware/authenticate')


router.post('/signin', validateUserCreate, signin)

router.post('/login', login)

router.get('/', isAuthenticated, list)

module.exports = router