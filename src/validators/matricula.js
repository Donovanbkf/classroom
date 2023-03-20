const { check, body, param } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const pool = require('../config/database')

const validateMatriculaCreate = [
  body("nota").exists().withMessage("nota no recibido").notEmpty().withMessage("nota vacío").isFloat().withMessage("tiene que ser float"),
  body("estado").isIn(['en curso', 'finalizada']).exists().withMessage('skill no recibido'),
  body("user_id").exists().withMessage("user_id no recibido").notEmpty().withMessage("user_id vacío").isInt().custom(async (value, {req}) => {
    const user = await pool.query('Select * from user where id = ?', [value]);
    if (user.length === 0) {
      req.status = 404
      throw new Error(`no existe este user`);
    }
    return true;
  }),
  body("asignature_id").exists().withMessage("asignature_id no recibido").notEmpty().withMessage("asignature_id vacío").isInt().custom(async (value, {req}) => {
    const user = await pool.query('Select * from asignature where id = ?', [value]);
    if (user.length === 0) {
      req.status = 404
      throw new Error(`no existe esta asignatura`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateMatriculaEdit = [
  body("nota").exists().withMessage("nota no recibido").notEmpty().withMessage("nota vacío").isFloat().withMessage("tiene que ser float"),
  body("estado").isIn(['en curso', 'finalizada']).exists().withMessage('skill no recibido'),
  body("user_id").exists().withMessage("user_id no recibido").notEmpty().withMessage("user_id vacío").isInt().custom(async (value, {req}) => {
    const user = await pool.query('Select * from user where id = ?', [value]);
    if (user.length === 0) {
      req.status = 404
      throw new Error(`no existe este user`);
    }
    return true;
  }),
  body("asignature_id").exists().withMessage("asignature_id no recibido").notEmpty().withMessage("asignature_id vacío").isInt().custom(async (value, {req}) => {
    const user = await pool.query('Select * from asignature where id = ?', [value]);
    if (user.length === 0) {
      req.status = 404
      throw new Error(`no existe esta asignatura`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateMatriculaDelete = [
  param("id").exists().withMessage("id no recibido").notEmpty().withMessage("id vacío").custom(async (value, {req}) => {
    const asignatura = await pool.query('Select * from matricula where id = ?', [value]);
    if (asignatura.length == 0) {
      req.status = 404
      throw new Error(`matricula actual no existe`);
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

module.exports = { validateMatriculaCreate, validateMatriculaEdit, validateMatriculaDelete }