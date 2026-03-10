import express from 'express'
import {getDashboardData} from '../controllers/dashboardControlers.js'
import { protect } from '../middleware/authmiddleware.js'

const router = express.Router();

router.get('/', protect, getDashboardData)

export default router