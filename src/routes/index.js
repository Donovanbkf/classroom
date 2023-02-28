const express = require('express');
const router = express.Router()

router.get('/', (req, res)=> {
    res.send('index');
})

router.get('/about/', (req, res)=> {
    res.send('Welcome about');
})

router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

module.exports = router