const pool = require('../config/database')
const { matchedData } = require("express-validator");


const new_asignatura = async (req, res)=> {
    req = matchedData(req)
    await pool.query('Insert into asignature set ?', [req])
    res.send(req)
}

const edit_asignatura = async (req, res)=> {
    const {id} = req.params
    req = matchedData(req)
    const asignatura = await pool.query('UPDATE asignature set ? WHERE id = ?',[req,id])
    res.send(asignatura)
}


const delete_asignature = async (req, res)=> {
    const {id} = req.params
    const asignatura = await pool.query('DELETE FROM asignature WHERE id = ?',[id])
    res.send(asignatura)
}

module.exports = { new_asignatura, edit_asignatura, delete_asignature }