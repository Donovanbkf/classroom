const express = require('express');
const router = express.Router()
const { new_asignatura, edit_asignatura, delete_asignature, list_asignature } = require('../controller/asignatura') 
const { validateAsignaturaCreate, validateAsignaturaEdit, validateAsignaturaDelete } = require('../validators/asignatura')

router.post('/new-asignatura', validateAsignaturaCreate, new_asignatura)

router.post('/edit-asignatura', validateAsignaturaEdit, edit_asignatura)

router.post('/delete-asignatura', validateAsignaturaDelete, delete_asignature)

router.get('/list-asignatura', list_asignature)

module.exports = router