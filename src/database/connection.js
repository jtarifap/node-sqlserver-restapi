import e from 'express';
import sql from 'mssql';
import { dbConfig } from '../config.js';


/* los datos de la base de datos se obtienen de la variable de entorno se encuentran en el archivo .env
y se llaman desde src/config.js!! 
 const dbString = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        encrypted: false,
        trustServerCertificate: true
    }
}  */

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig)
        return pool

        //** Pruebas de conexión */
        // const result = await pool.request().query('select id, usuario, nombre from VV_USERS')
        //const result = await pool.request().query('select * from Customers')
        //const result = await pool.request().query('select getdate() as fecha')
        //console.log(result)
        // return pool
    } catch (error) {
        console.log(error);
    }
}
