import express from 'express'
import {addExpense, getAllExpense, deleteExpense, downloadExpense} from '../controllers/expenseControlers.js'
import { protect } from '../middleware/authmiddleware.js'

const router = express.Router();

router.post('/add', protect, addExpense)
router.get('/get', protect, getAllExpense)
router.get('/download', protect, downloadExpense)
router.delete('/:id', protect, deleteExpense)

export default router