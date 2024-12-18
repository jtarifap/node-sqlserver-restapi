import { Router } from 'express'
import { getExtracts } from '../controllers/extracts.controllers.js'
const router = Router()

router.post("/extractos", getExtracts)  

export default router