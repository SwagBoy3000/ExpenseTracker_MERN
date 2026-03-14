import Income from '../models/Income.js'
import Expense from '../models/Expense.js'
import {Types} from 'mongoose'

export async function getDashboardData(req,res) {

    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        const userObjectId = new Types.ObjectId(String(userId))

        const totalIncome  = await Income.aggregate([
            { $match: {userId: userObjectId}},
            { $group: { _id: null, total:{ $sum: "$amount"}}}
        ])

        const totalExpense =  await Expense.aggregate([
            {$match : {userId: userObjectId}},
            {$group : {_id: null, total:{ $sum: "$amount"}}}
        ])

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date : {$gte: new Date(Date.now()-60*24*60*60*1000)}
        }).sort({date: -1})

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 
            0 
        )

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date : {$gte: new Date(Date.now()-30*24*60*60*1000)}
        }).sort({date: -1})

        const ExpenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 
            0 
        )
        
        const recentIncome = await Income.find({ userId }).sort({ date: -1 }).limit(5)
        const recentExpense = await Expense.find({ userId }).sort({ date: -1 }).limit(5)

        const lastTransactions = [
            ...recentIncome.map((txn) => ({
                ...txn.toObject(),
                type: 'income',
            })),
            ...recentExpense.map((txn) => ({
                ...txn.toObject(),
                type: 'expense',
            })),
        ].sort((a, b) => b.date - a.date)

        res.json({
        totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

        totalIncome: totalIncome[0]?.total || 0,
        totalExpenses: totalExpense[0]?.total || 0,

        last30DaysExpenses: {
            total: ExpenseLast30Days,
            transactions: last30DaysExpenseTransactions,
        },

        last60DaysIncome: {
            total: incomeLast60Days,
            transactions: last60DaysIncomeTransactions,
        },

        recentTransactions: lastTransactions,
        });

    } catch (error) {
        console.error('Dashboard fetch error:', error)
        res.status(500).json({message : "internal server error"})
    }
}