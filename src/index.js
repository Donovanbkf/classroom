require('dotenv').config();
const morgan = require('morgan')
const express = require('express')
const pool = require('./config/database') // ahora se ejecuta el poll y debería ssalir db is connected

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

//routes
app.use('/auth',require('./routes/auth')) 
app.use('/asignatura',require('./routes/asignatura'))
app.use('/matricula',require('./routes/matricula'))
app.use(require('./routes/')) 

// app.use(require('./routes/links'))
