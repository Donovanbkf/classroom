const { check, body, param } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const pool = require('../config/database')

const validateAsignaturaCreate = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill").isIn(['mates', 'castellano', 'ingles', 'valenciano', 'fisica', 'quimica', 'informatica']).exists().withMessage('skill no recibido'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateAsignaturaEdit = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill").isIn(['mates', 'castellano', 'ingles', 'valenciano', 'fisica', 'quimica', 'informatica']).exists().withMessage('skill no recibido'),
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const asignatura = await pool.query('Select * from asignatura where id = ?', [value]);
    if (asignatura.length == 0) {
      req.status = 404
      throw new Error(`Asignatura actual no existe`);
    }else if (asignatura.user_id != req.user.id){
      req.status = 403
      throw new Error(`asignatura actual no te pertenece`);
    }
    return true;
  }), 
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateAsignaturaDelete = [
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const asignatura = await pool.query('Select * from asignatura where id = ?', [value]);
    if (asignatura.length == 0) {
      req.status = 404
      throw new Error(`Asignatura actual no existe`);
    }else if (asignatura.user_id != req.user.id){
      req.status = 403
      throw new Error(`asignatura actual no te pertenece`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

module.exports = { validateAsignaturaCreate, validateAsignaturaEdit, validateAsignaturaDelete }