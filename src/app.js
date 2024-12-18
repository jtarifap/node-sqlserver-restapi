import express from 'express'
import productsRoutes from './routes/products.routes.js'
import loginRoutes from './routes/login.routes.js'
import extractRoutes from './routes/extracts.routes.js'



const app = express()
app.use(express.json())
app.use(productsRoutes, loginRoutes, extractRoutes)
// Define las rutas
/* app.use('/products', productsRoutes);
app.use('/auth', loginRoutes);
 */
//app.use(express.json())
//app.use('/api/products', productsRoutes)

export default app

