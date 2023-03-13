const { body } = require('express-validator')
const { validateResult } = require("../helpers/helperValidator");
const {compare} = require('../helpers/handleBcrypt')
const pool = require('../config/database')

const validateUserCreate = [
  body("name").exists().withMessage('name no recibido').isLength({min:5, max:20}).withMessage('tamaño incorrecto'),
  body("username").exists().withMessage('username no recibido').isLength({min:5, max:20}).withMessage('tamaño incorrecto').custom(async (value, {req}) => {
    const user = await pool.query('Select * from user where username = ?', [value]);
    console.log(user)
    console.log(user.length)
    if (user.length > 0) {
      req.status = 409
      throw new Error(`User ${value} already exists`);
    }
    return true;
  }),
  body("email").exists().withMessage('email no recibido').isEmail().withMessage('no es un email').custom(async (value, {req}) =>{
    const user = await pool.query('Select * from user where email = ?', [value]);
    if (user.length() > 0) {
      req.status = 409
      throw new Error(`email ${value} already exists`);
    }
    return true;
  }),
  body("dni").exists().withMessage('dni no recibido').custom(async (value, {req}) =>{
    const user = await pool.query('Select * from user where dni = ?', [value]);
    if (user.length() > 0) {
      req.status = 409
      throw new Error(`dni ${value} already exists`);
    }
    return true;
  }),
  body("fullname").exists().withMessage('fullname no recibido').notEmpty().isLength({min:5, max:20}).withMessage('tamaño incorrecto'),
  body("password").exists().withMessage('password no recibido').notEmpty(),
  body("role").isIn(["alumno", "admin", "profesor"]).exists().withMessage('role no recibido'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

// const validateUserLogin = [
//     body("username").exists().withMessage('username no recibido').notEmpty().withMessage('username vacío').custom(async (value, {req}) => {
//       const user = await Users.findOne({raw:true, where: { username: value } });
//       req.user = user;
//       if (!user){
//         req.status = 404
//         throw new Error(`User ${value} dont exists`);
//       }
//       return true;
//     }),
//     body("password").exists().withMessage('password no recibido').notEmpty().custom(async (value, {req}) => {
//       const user = req.user;
//       if(!await compare(value, user.password)){
//         req.status = 401;
//         throw new Error(`Contraseña no valida`);
//       }     
//       return true;
//       }),
//     (req, res, next) => {
//       validateResult(req, res, next);
//     },
//   ];

// module.exports = {validateUserCreate, validateUserLogin}
module.exports = {validateUserCreate}