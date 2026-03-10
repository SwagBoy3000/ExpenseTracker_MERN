import express from 'express'
import {addIncome, getAllIncome, deleteIncome, downloadIncome} from '../controllers/incomeControlers.js'
import { protect } from '../middleware/authmiddleware.js'

const router = express.Router();

router.post('/add', protect, addIncome)
router.get('/get', protect, getAllIncome)
router.get('/download', protect, downloadIncome)
router.delete('/:id', protect, deleteIncome)

export default router