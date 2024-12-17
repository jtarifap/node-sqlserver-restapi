import { getConnection } from '../database/connection.js';
import sql from 'mssql';


export const getProducts = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('select * from  products')
    res.json(result.recordset)
    console.log(result);

    //res.send(`obtener productos`);

}
export const getProductById = async (req, res) => {
    const pool = await getConnection();
    const id = req.params.id
    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query('select * from products where id = @id')

    if (result.rowsAffected[0] === 0) {
       return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json(result.recordset[0]);
    console.log(result);
}

export const createProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("name", sql.VarChar, req.body.name)
        .input("price", sql.Decimal, req.body.price)
        .input("quantity", sql.Int, req.body.quantity)
        .input("description", sql.Text, req.body.description)
        .query(
            "insert into products(name, price, quantity, description) values(@name, @price, @quantity, @description);" +
            "select scope_identity() as id;"
        );

    res.json({
        id: result.recordset[0].id,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description
    })
    console.log(result);

    // logic to create a new product
    //res.send(`crear producto`);
}

export const updateProduct = async (req, res) => {
    const id_ = req.params.id;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, id_)
        .input("name", sql.VarChar, req.body.name)
        .input("price", sql.Decimal, req.body.price)
        .input("quantity", sql.Int, req.body.quantity)
        .input("description", sql.Text, req.body.description)
        .query(
            "update products set name = @name, price = @price, quantity = @quantity, description = @description " +
            "where id = @id"
        );
    if (result.rowsAffected[0] === 0) {
        res.status(404).json({ message: 'Producto no encontrado' })
    }

    console.log(result);
    res.json({
        id: id_,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description
    });
    // logic to update a product
    // res.send(`actualizar producto con id ${id} con ${product}`);
}

export const deleteProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("delete from products where id = @id");

    console.log(result);
    if (result.rowsAffected[0] === 0) {
        res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json(`Eliminado el producto con id ${req.params.id}`);
    // logic to delete a product
    //res.send(`eliminar producto con id `);
}

