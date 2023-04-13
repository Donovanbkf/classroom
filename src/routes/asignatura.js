const express = require('express');
const router = express.Router()
const { new_asignatura, edit_asignatura, delete_asignature, list_asignature } = require('../controller/asignatura') 
const { validateAsignaturaCreate, validateAsignaturaEdit, validateAsignaturaDelete } = require('../validators/asignatura')
const {isAuthenticated, checkRol} = require('../middleware/authenticate')

router.post('/new-asignatura', isAuthenticated, checkRol('admin'), validateAsignaturaCreate, new_asignatura)

router.post('/edit-asignatura', isAuthenticated, checkRol('admin'), validateAsignaturaEdit, edit_asignatura)

router.post('/delete-asignatura', isAuthenticated, checkRol('admin'), validateAsignaturaDelete, delete_asignature)

router.get('/list-asignatura', isAuthenticated, list_asignature)

module.exports = router