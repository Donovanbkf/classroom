const { check, body, param } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const pool = require('../config/database')

const validateAsignaturaCreate = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill").isIn(['mates', 'castellano', 'ingles', 'valenciano', 'fisica', 'quimica', 'informatica']).exists().withMessage('skill no recibido'),
  body("teacher_id").exists().withMessage("teacher_id no recibido").notEmpty().withMessage("teacher_id vacío").isInt().custom(async (value, {req}) => {
    const user = await pool.query('Select * from user where id = ?', [value]);
    if (user.length == 0) {
      req.status = 404
      throw new Error(`no existe este usuario`);
    }else if(user.role != 'profesor'){
      req.status = 404
      throw new Error(`este usuario no es un profesor`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateAsignaturaEdit = [
  body("description").exists().withMessage("description no recibido").notEmpty().withMessage("description vacío"),
  body("skill").isIn(['mates', 'castellano', 'ingles', 'valenciano', 'fisica', 'quimica', 'informatica']).exists().withMessage('skill no recibido'),
  body("teacher_id").exists().withMessage("teacher_id no recibido").notEmpty().withMessage("teacher_id vacío").isInt().custom(async (value, {req}) => {
    const user = await pool.query('Select * from user where id = ?', [value]);
    if (user.length == 0) {
      req.status = 404
      throw new Error(`no existe este usuario`);
    }else if(user.role != 'profesor'){
      req.status = 404
      throw new Error(`este usuario no es un profesor`);
    }
    return true;
  }),
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const asignatura = await pool.query('Select * from asignatura where id = ?', [value]);
    if (asignatura.length == 0) {
      req.status = 404
      throw new Error(`Asignatura actual no existe`);
    }else if (req.user.role != 'admin'){
      req.status = 403
      throw new Error(`No eres admin`);
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
    }else if (req.user.role != 'admin'){
      req.status = 403
      throw new Error(`No eres admin`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

module.exports = { validateAsignaturaCreate, validateAsignaturaEdit, validateAsignaturaDelete }