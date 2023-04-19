const pool = require('../config/database')
const { matchedData } = require("express-validator");


const new_asignatura = async (req, res)=> {
    const id = req.user.id;
    req = matchedData(req)
    req.user_id = id;
    console.log(req)
    await pool.query('Insert into asignature set ?', [req])
    res.send('queee')
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

const list_asignature = async (req, res)=> {
    const asignaturas = await pool.query('Select * FROM asignature')
    res.send(asignaturas[0])
}

module.exports = { new_asignatura, edit_asignatura, delete_asignature, list_asignature }