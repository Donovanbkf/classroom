const express = require('express');
const router = express.Router()
const { inscribir, editar_inscripcion, delete_inscripcion, list_inscripcion } = require('../controller/matricula') 
const {isAuthenticated, checkRol} = require('../middleware/authenticate')

router.post('/new-inscripcion', isAuthenticated, checkRol('profesor'), inscribir)

router.post('/edit-inscripcion', isAuthenticated, checkRol('profesor'), editar_inscripcion)

router.post('/delete-inscripcion', isAuthenticated, checkRol('profesor'), delete_inscripcion)

router.get('/list-inscripciones', isAuthenticated, list_inscripcion)

module.exports = router