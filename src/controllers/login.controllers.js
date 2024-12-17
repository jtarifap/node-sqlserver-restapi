import { getConnection } from '../database/connection.js';
import sql from 'mssql';

// Controlador para el login
export const getLogin = async (req, res) => {
    try {
        // Extraer user y password del body de la solicitud
        const user = req.body.user;
        const password = req.body.password;
        // Validar que se envían ambos parámetros
        if (!user || !password) {
            return res.status(400).json({ message: 'User y Password son requeridos' });
        }
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("user", sql.VarChar, user)
            .input("password", sql.VarChar, password)
            .query(
                "SELECT * FROM vvusers WHERE usuario = @user AND password = @password;"
            );
        console.log("result.recordset.length --- : " + result.recordset.length);
        // Si no se encuentran resultados
        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' })
        }

        // Enviar el resultado al cliente
        return res.json({ message: 'Login exitoso', user: result.recordset[0] });

        console.log(result);
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }

}


