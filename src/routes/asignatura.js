const express = require('express');
const router = express.Router()
const { new_asignatura, edit_asignatura, delete_asignature } = require('../controller/asignatura') 
// const {validateUserCreate, validateUserLogin} = require('../validators/users')

router.post('/new-asignatura', new_asignatura)

router.post('/edit-asignatura', edit_asignatura)

router.post('/delete-asignatura', delete_asignature)

module.exports = router