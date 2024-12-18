import { getConnectionSAP } from '../database/connection.js';
import sql from 'mssql';

// Controlador para el login
export const getExtracts = async (req, res) => {
    try {
        // Extraer user y password del body de la solicitud
        const idcli = req.body.idcli;
        const fechafin = req.body.fechafin;
        const tipovisu = req.body.tipovisu;
        const sql_params = " SELECT Ref1 AS 'ndoc', " +
        "        Alb AS 'alb'," +
        "        CASE" +
        "            WHEN CONVERT(varchar,RefDate, 103) = '01/01/1900' THEN '---'" +
        "            ELSE CONVERT(varchar,RefDate, 103)" +
        "        END AS 'fcontab'," +
        "        CASE" +
        "            WHEN CONVERT(varchar,DueDate, 103) = '01/01/1900' THEN '---'" +
        "            ELSE CONVERT(varchar,DueDate, 103)" +
        "        END AS 'fvto'," +
        "        LineMemo AS 'infodet'," +
        "        isnull(refsinli, '') AS 'refsinli'," +
        "        SUM(CASE" +
        "                WHEN TipoTrans = 14" +
        "                     AND (Debit - Credit) > 0 THEN -(Debit - Credit)" +
        "                ELSE (Debit - Credit)" +
        "            END) AS 'imptfra'," +
        "        CASE" +
        "            WHEN TipoTrans = 14" +
        "                 AND sum(BalDueDeb - BalDueCred) > 0 THEN -(sum(BalDueDeb - BalDueCred))" +
        "            ELSE (sum(BalDueDeb - BalDueCred))" +
        "        END AS 'imptpend'," +
        "        SUM(CASE" +
        "                WHEN TipoTrans = 14" +
        "                     AND (BalDueDeb - BalDueCred) > 0 THEN -(BalDueDeb - BalDueCred)" +
        "                ELSE (BalDueDeb - BalDueCred)" +
        "            END) OVER (" +
        "                       ORDER BY RefDate, TransId, Line_ID ASC) AS 'saldocta'," +
        "        '' AS 'accion'" +
        " FROM" +
        "   (SELECT Ref1 = ''," +
        "           '' AS RefDate," +
        "           '' AS DueDate," +
        "           LineMemo = '----- Saldo Anterior -----'," +
        "           0 AS Debit," +
        "           0 AS Credit," +
        "           sum(T0.BalDueDeb - T0.BalDueCred) AS BalDueDeb," +
        "           0 AS BalDueCred," +
        "           '' AS 'TransId'," +
        "           '' AS 'Line_ID'," +
        "           '---' AS Alb," +
        "           '' AS refsinli," +
        "           T0.TransType AS TipoTrans" +
        "    FROM JDT1 T0" +
        "    WHERE T0.ShortName = ('C000064')" +
        "      AND (T0.BalDueDeb <> (0)" +
        "           OR T0.BalDueCred <> 0" +
        "           OR T0.BalFcDeb <> 0" +
        "           OR T0.BalFcCred <> 0)" +
        "      AND T0.RefDate < '20240630'" +
        "    GROUP BY T0.Transtype" +
        "    UNION SELECT CAST(T0.Ref1 AS VARCHAR) AS Ref1," +
        "                 T0.RefDate AS RefDate," +
        "                 T0.DueDate AS DueDate," +
        "                 T0.LineMemo AS LineMemo," +
        "                 T0.Debit AS Debit," +
        "                 T0.Credit AS Credit," +
        "                 T0.BalDueDeb AS BalDueDeb," +
        "                 T0.BalDueCred AS BalDueCred," +
        "                 T0.TransId AS TransId," +
        "                 T0.Line_ID AS Line_ID," +
        "                 CASE" +
        "                     WHEN T0.Transtype = 13 THEN T5.U_CODALBS" +
        "                     WHEN T0.Transtype = 14 THEN T6.U_CODALBS" +
        "                     ELSE '---'" +
        "                 END AS Alb," +
        "                 CASE" +
        "                     WHEN T0.Transtype = 13 THEN T5.u_vvrefalb" +
        "                     WHEN T0.Transtype = 14 THEN T6.u_vvrefalb" +
        "                     ELSE ''" +
        "                 END AS refsinli," +
        "                 T0.TransType AS TipoTrans" +
        "    FROM JDT1 T0" +
        "    LEFT OUTER JOIN OUSR T1 ON T1.USERID = T0.UserSign" +
        "    INNER JOIN OJDT T3 ON T3.TransId = T0.TransId" +
        "    LEFT OUTER JOIN OOAT T4 ON T4.AbsID = T3.AgrNo" +
        "    LEFT JOIN OINV T5 ON cast(T5.Docnum AS nvarchar(10)) = cast(T0.Ref1 AS nvarchar(10))" +
        "    AND T0.TransType = 13" +
        "    LEFT JOIN ORIN T6 ON cast(T6.Docnum AS nvarchar(10)) = cast(T0.Ref1 AS nvarchar(10))" +
        "    AND T0.TransType = 14" +
        "    WHERE T0.ShortName = ('C000064')" +
        "      AND (T0.BalDueDeb <> (0)" +
        "           OR T0.BalDueCred <> 0" +
        "           OR T0.BalFcDeb <> 0" +
        "           OR T0.BalFcCred <> 0)" +
        "      AND T0.transtype <> 25" +
        "      AND T0.RefDate >= '20240630'" +
        "    UNION SELECT CASE" +
        "                     WHEN T0.InvType = 13 THEN" +
        "                            (SELECT CAST(tx.docnum AS VARCHAR)" +
        "                             FROM oinv tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                     WHEN T0.InvType = 14 THEN" +
        "                            (SELECT CAST(tx.docnum AS VARCHAR)" +
        "                             FROM orin tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                 END AS 'Ref1'," +
        "                 CASE" +
        "                     WHEN T0.InvType = 13 THEN" +
        "                            (SELECT tx.Docdate" +
        "                             FROM oinv tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                     WHEN T0.InvType = 14 THEN" +
        "                            (SELECT tx.Docdate" +
        "                             FROM orin tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                 END AS 'RefDate'," +
        "                 CASE" +
        "                     WHEN T0.InvType = 13 THEN" +
        "                            (SELECT tx.DocDueDate" +
        "                             FROM oinv tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                     WHEN T0.InvType = 14 THEN" +
        "                            (SELECT tx.DocDueDate" +
        "                             FROM orin tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                 END AS 'DueDate'," +
        "                 CASE" +
        "                     WHEN T0.InvType = 13 THEN 'Factura de clientes --'" +
        "                     WHEN T0.InvType = 14 THEN 'Abonos de clientes --'" +
        "                 END AS 'LineMemo'," +
        "                 T0.SumApplied AS 'Debit'," +
        "                 0 AS Credit," +
        "                 T0.SumApplied AS 'BalDueDeb'," +
        "                 0 AS 'BalDueCred'," +
        "                 600000 AS 'TransId'," +
        "                 0 AS 'Line_ID'," +
        "                 CASE" +
        "                     WHEN T0.InvType = 13 THEN" +
        "                            (SELECT tx.U_CODALBS" +
        "                             FROM oinv tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                     WHEN T0.InvType = 14 THEN" +
        "                            (SELECT tx.U_CODALBS" +
        "                             FROM orin tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                 END AS 'Alb'," +
        "                 CASE" +
        "                     WHEN T0.InvType = 13 THEN" +
        "                            (SELECT tx.u_vvrefalb" +
        "                             FROM oinv tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                     WHEN T0.InvType = 14 THEN" +
        "                            (SELECT tx.u_vvrefalb" +
        "                             FROM orin tx" +
        "                             WHERE tx.docentry = T0.docentry)" +
        "                 END AS 'refsinli'," +
        "                 T0.InvType AS TransType" +
        "    FROM RCT2 T0" +
        "    INNER JOIN ORCT T1 ON T0.docnum = t1.docentry" +
        "    INNER JOIN OBOE T3 ON T3.BoeNum = T1.BoeNum" +
        "    WHERE t1.boenum IN" +
        "        (SELECT boenum" +
        "         FROM OBOE" +
        "         WHERE cardcode = ('C000064')" +
        "           AND BoeStatus = 'D')" +
        "      AND pmntDate >= '20240630') XX" +
        " GROUP BY XX.Refdate," +
        "          XX.DueDate," +
        "          XX.Ref1," +
        "          XX.LineMemo," +
        "          XX.Debit," +
        "          XX.Credit," +
        "          XX.Alb," +
        "          XX.TransId," +
        "          XX.Line_Id," +
        "          XX.refsinli," +
        "          XX.TipoTrans," +
        "          XX.BalDueDeb," +
        "          XX.BalDueCred" +
        " ORDER BY RefDate"

        console.log(sql_params);
        // Validar que se envían ambos parámetros
        if (!idcli) {
            return res.status(400).json({ message: 'Selecciona un cliente válido' });
        }
        const pool = await getConnectionSAP();
        const result = await pool
            .request()
            .input("idcli", sql.VarChar, idcli)
            .input("fechafin", sql.VarChar, fechafin)
            .input("tipovisu", sql.VarChar, tipovisu)
            .query(
                sql_params
            );
        console.log("result.recordset.length --- : " + result.recordset.length);
        // Si no se encuentran resultados
        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'No se ha encontrado resultados' })
        }

        // Enviar el resultado al cliente
        return res.json({ message: 'OK Extract: ', result: result.recordset });

        console.log(result);
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }

}


