require('dotenv').config();
const express = require('express')
const pool = require('./config/database') // ahora se ejecuta el poll y debería ssalir db is connected

const app = express()

// settings
const port = process.env.PORT || 3332
app.listen(port, () => {
    console.log('listening on port ' + port)
})

