import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        encrypted: false,
        trustServerCertificate: true
    }
};

export const dbConfigSAP = {
    user: process.env.USER_SAP,
    password: process.env.PASSWORD_SAP,
    server: process.env.SERVER_SAP,
    database: process.env.DATABASE_SAP,
    port: 1434,
    options: {
        encrypted: false,
        trustServerCertificate: true
    }
};