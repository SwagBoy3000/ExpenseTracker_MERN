import Expense from '../models/Expense.js'
import xlsx from 'xlsx'

export async function addExpense(req,res) {
    const userId = req.user.id
    try {
        const {icon, source, amount,  date} = req.body
        
        if (!source || !amount || !date) {
            res.status(400).json({message : 'All fields are required'})
        }

        const newIncome = new Income({userId, icon, source, amount,  date: new Date(date)})

        await newIncome.save()

        res.status(200).json(newIncome)
    } catch (error) {
        res.status(500).json({message : 'Server error'})
    }
}

export async function getAllExpense(req,res) {
    
    const userId = req.user.id
    
    try {
         
        const incomes = await Income.find({userId}).sort({date : -1})
        res.status(200).json(incomes);

    } catch (error) {
       
        console.error("Couldn't fetch incomes :", error);
        res.status(500).json({message : "Internal server error"});
    }

}

export async function downloadExpense(req,res) {

    const userId = req.user.id

    try {
        
        const income = await Income.find({userId}).sort({date : -1})

        const data = income.map((item) => ({
            Source : item.source,
            Amount : item.amount,
            Date : item.date,
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, 'Income')
        xlsx.writeFile(wb, 'income_details.xlsx')
        res.download('income_details.xlsx')

    } catch (error) {
        
        res.status(500).json({message : "server error"})

    }

}

export async function deleteExpense(req,res) {

    try {
        
        await Income.findByIdAndDelete(req.params.id);
        res.json({message : "deleted"})

    } catch (error) {
        
        console.error("Couldn't delete incomes :", error);
        res.status(500).json({message : "Internal server error"})

    }
}