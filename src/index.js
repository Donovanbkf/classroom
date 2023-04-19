require('dotenv').config();
const morgan = require('morgan')
const express = require('express')
const session = require('express-session');
const passport = require('passport');
require("./config/passport")(passport);

const app = express()

// settings
const port = process.env.PORT || 3332
app.listen(port, () => {
    console.log('listening on port ' + port)
})

// middleware
app.use(morgan('dev'))
app.use(express.json()) // para postman JSON hace que funcione ¿?
app.use(express.urlencoded({ extended: true})) // para los form hace que funcione ¿? y son true elimina el [Object: null prototype] { } 

//session
app.set('trust proxy', 1)
app.use(session({
    key: 'classroom',//nombre de la cookie
    secret: 'secretitio', // Clave secreta para la sesión
    resave: false, // No guardar sesión si no hay cambios
    saveUninitialized: false, // No guardar sesión si no hay datos
    cookie: { maxAge: 3600000 }
    // store: new mysqlStore(key)   //donde guardar session (bbdd o memoria servidor)
}));
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use('/auth',require('./routes/auth')) 
app.use('/asignatura',require('./routes/asignatura'))
app.use('/matricula',require('./routes/matricula'))
app.use(require('./routes/')) 
