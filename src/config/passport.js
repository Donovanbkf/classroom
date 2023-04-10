const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/database')
const {compare} = require('../helpers/handleBcrypt')

module.exports = function (passport) { 
  passport.use('local', new LocalStrategy({ //nombre elegido a nuestra eleccion
    usernameField: 'username',  //name del campo del formulario 
    passportField: 'password'//para recibir el parametro req y así poder usar mas parametros aparte de esos dos

  }, async (username, password, done) => {
    try {
      const [rows] = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
      
      if (rows.length === 0) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const user = rows;
      console.log(user);
      if (!await compare(password, user.password)) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
      done(null, user.id);
  });
    
  passport.deserializeUser(async (id, done) => {
      try {
        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
        const user = rows;

        if (!user) {
        return done(new Error(`Usuario con el id ${id} no encontrado`));
        }

        return done(null, user);
      } catch (error) {
          return done(error);
      }
  });
}