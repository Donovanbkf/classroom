const pool = require('../config/database')
const { matchedData } = require("express-validator");
const {encrypt} = require('../helpers/handleBcrypt')
const passport = require('passport');

const signin = async (req, res)=> {
    req = matchedData(req)
    if (req.role === 'profesor'){
        req.cantidad = 0
    }
    req.password = await encrypt(req.password) 
    await pool.query('Insert into user set ?', [req])
    res.send(req)
}

const login = (req,res,next) => {passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/about/"
  })(req,res,next);
}

const list = async (req, res)=> {
    console.log(req.sessionID)
    const users = await pool.query('Select * from user')
    res.send(users)
}

module.exports = { signin, login, list }