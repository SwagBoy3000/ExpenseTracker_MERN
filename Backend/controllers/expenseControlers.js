import Expense from '../models/Expense.js'
import xlsx from 'xlsx'

export async function addExpense(req,res) {
    const userId = req.user.id
    try {
        const {icon, category, amount,  date} = req.body
        
        if (!source || !amount || !date) {
            res.status(400).json({message : 'All fields are required'})
        }

        const newExpense = new Expense({userId, icon, category, amount,  date: new Date(date)})

        await newExpense.save()

        res.status(200).json(newExpense)
    } catch (error) {
        res.status(500).json({message : 'Server error'})
    }
}

export async function getAllExpense(req,res) {
    
    const userId = req.user.id
    
    try {
         
        const expense = await Expense.find({userId}).sort({date : -1})
        res.status(200).json(expense);

    } catch (error) {
       
        console.error("Couldn't fetch expense :", error);
        res.status(500).json({message : "Internal server error"});

    }

}

export async function downloadExpense(req,res) {

    const userId = req.user.id

    try {
        
        const expense = await Expense.find({userId}).sort({date : -1})

        const data = expense.map((item) => ({
            category : item.category,
            Amount : item.amount,
            Date : item.date,
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, 'expense')
        xlsx.writeFile(wb, 'expense_details.xlsx')
        res.download('expense_details.xlsx')

    } catch (error) {
        
        res.status(500).json({message : "server error"})

    }

}

export async function deleteExpense(req,res) {

    try {
        
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message : "deleted"})

    } catch (error) {
        
        console.error("Couldn't delete expense :", error);
        res.status(500).json({message : "Internal server error"})

    }
}