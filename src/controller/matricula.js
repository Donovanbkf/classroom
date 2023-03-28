const pool = require('../config/database')
const { matchedData } = require("express-validator");


const inscribir = async (req, res)=> {
    req = matchedData(req)
    await pool.query('Insert into matricula set ?', [req])
    res.send(req)
}

const editar_inscripcion = async (req, res)=> {
    const {id} = req.params
    req = matchedData(req)
    const asignatura = await pool.query('UPDATE matricula set ? WHERE id = ?',[req,id])
    res.send(asignatura)
}

const delete_inscripcion = async (req, res)=> {
    const {id} = req.params
    const asignatura = await pool.query('DELETE FROM matricula WHERE id = ?',[id])
    res.send(asignatura)
}

const list_inscripcion = async (req, res)=> {
    const matriculas = await pool.query('Select * FROM matricula')
    res.send(matriculas[0])
}

module.exports = { inscribir, editar_inscripcion, delete_inscripcion, list_inscripcion }