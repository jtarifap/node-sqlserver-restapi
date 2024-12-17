import { Router } from 'express'
import { getLogin } from '../controllers/login.controllers.js'
const router = Router()

router.post("/login", getLogin)  

export default router