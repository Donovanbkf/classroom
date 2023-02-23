require('dotenv').config();
const express = require('express')

const app = express()

// settings
const port = process.env.PORT || 3332
app.listen(port, () => {
    console.log('listening on port ' + port)
})

