import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import axiosInstance from '../../utils/axiosInstance';

const Expense = () => {
    useUserAuth();

    const [expenseData, setExpenseData] = useState([])
    const [Loading, setLoading] = useState(false)
    const [OpenDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    })
    
    const [OpenAddExpenseModal, setOpenAddExpenseModal] = useState(false)
    
    const fetchExpenseDetails = async () => {
  if (Loading) return 
  setLoading(true)
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
    )

    if (response.data) {

      setIncomeData(response.data)
      
    }

  } catch (error) {
    
    console.log("something went wrong", error)

  } finally {
    setLoading(false);
  }
}

const handleAddExpense = async (expense) => {
  const {category, amount, date, icon} = expense;

  if (!category.trim()) {
    toast.error("amount should be a valid number")
    return;
  }

  if (!date) {
    toast.error("Date is required")
    return;
  }

  try {
    await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
      category,
      amount,
      date,
      icon,
    })

    setOpenAddExpenseModal(false);
    toast.success("Expense added")
    fetchExpenseDetails()

  } catch (error) {
    
    console.error(
      'Error adding:',
      error.response?.data?.message || error.message
    )

  }
}

const deleteExpense = async (id) => {
  try {
    await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

    setOpenDeleteAlert({show: false, data: null})
    toast.success("Expense details deleted")
    fetchIncomeDetails();
  } catch (error) {
    console.error(
      "error deleting",
      error.response?.data?.message || error.message
    )
  }
}

const handleDownloadExpenseDetails = async () => {
  try{
  const response = await axiosInstance.get(
    API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
    {
      responseType: 'blob'
    }
  )
  const url = window.URL.createObjectURL(new Blob(response.data))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", "expense_details.xlsx")
  document.body.appendChild(link)
  window.URL.revokeObjectURL(url)
} catch (error) {
  console.error("Error", error)
  toast.error("Failed to Download expense details")
}}

useEffect(() => {
  fetchExpenseDetails()

  return () => {
    
  }
}, [])


  return (
    <DashboardLayout activeMenu='Expense'>
          <div className='my-5 mx-auto' >
            <div className='grid grid-cols-1 gap-6'>
              <div className=''>
                <ExpenseOverview
                  transactions={expenseData}
                  onExpenseIncome={ () => setOpenAddExpenseModal(true)}
                />
              </div>
              <ExpenseList 
                transactions={expenseData}
                onDelete={(id) => {
                  setOpenDeleteAlert({show:true, data: id})
                }}
                onDownload={handleDownloadExpenseDetails}
              />
            </div>
            <Modal
              isOpen = {OpenAddExpenseModal}
              onClose={() => setOpenAddExpenseModal(false)}
              title="Add Expense"
            >
              <AddExpenseForm OnAddExpense={handleAddExpense} />   
            </Modal>

            <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show:false, data:null})}
          title="Delete Expense"
        >
          <DeleteAlert 
            content="are you sure you want to delete this expense"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>

          </div>
    </DashboardLayout>)
}

export default Expense