const express = require('express');
const router = express.Router()
const { inscribir, editar_inscripcion, delete_inscripcion, list_inscripcion } = require('../controller/matricula') 
// const {validateUserCreate, validateUserLogin} = require('../validators/users')

router.post('/new-notas', inscribir)

router.post('/edit-notas', editar_inscripcion)

router.post('/delete-notas', delete_inscripcion)

router.get('/list-notas', list_inscripcion)

module.exports = router