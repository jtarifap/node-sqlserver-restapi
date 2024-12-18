import e from 'express';
import sql from 'mssql';
import { dbConfig, dbConfigSAP } from '../config.js';

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig)
        return pool
    } catch (error) {
        console.log(error);
    }
}

export const getConnectionSAP = async () => {
    try {
        const pool = await sql.connect(dbConfigSAP)
        return pool
    } catch (error) {
        console.log(error);
    }
}