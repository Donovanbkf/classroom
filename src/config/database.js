const mysql = require('mysql2')
const {promisify} = require('util') //permite pasar codigo de callbacks a codigo de promesas y soprte await y tal

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Analistabkf1',
    database: 'classroom'
}); //tiene 'hilos' para conexiones en secuencia

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err.message)
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexion con database fue cerrada')
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){ 
            console.error('Database has to many connections')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexion con database fue rechazada')
        }
    }
    if(connection){
        connection.release()
        console.log('DB is connected')
    }
    
    return;
})

pool.query = promisify(pool.query) // convertimos en promesas el poo.query solo

module.exports = pool