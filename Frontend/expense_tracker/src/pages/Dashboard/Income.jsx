import React, { useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useState } from 'react'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([])
  const [Loading, setLoading] = useState(false)
  const [OpenDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false)

const fetchIncomeDetails = async () => {
  if (Loading) return 
  setLoading(true)
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.INCOME.GET_ALL_INCOME}`
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

const handleAddIncome = async (income) => {
  const {source, amount, date, icon} = income;

  if (!source.trim()) {
    toast.error("amount should be a valid number")
    return;
  }

  if (!date) {
    toast.error("Date is required")
    return;
  }

  try {
    await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
      source,
      amount,
      date,
      icon,
    })

    setOpenAddIncomeModal(false);
    toast.success("Income added")
    fetchIncomeDetails()

  } catch (error) {
    
    console.error(
      'Error adding:',
      error.response?.data?.message || error.message
    )

  }
}

const deleteIncome = async (id) => {
  try {
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

    setOpenDeleteAlert({show: false, data: null})
    toast.success("Income details deleted")
    fetchIncomeDetails();
  } catch (error) {
    console.error(
      "error deleting",
      error.response?.data?.message || error.message
    )
  }
}

const handleDownloadIncomeDetails = async () => {
   try{
  const response = await axiosInstance.get(
    API_PATHS.INCOME.DOWNLOAD_INCOME,
    {
      responseType: 'blob'
    }
  )
  const url = window.URL.createObjectURL(new Blob(response.data))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", "income_details.xlsx")
  document.body.appendChild(link)
  window.URL.revokeObjectURL(url)
} catch (error) {
  console.error("Error", error)
  toast.error("Failed to Download income details")
}
}

useEffect(() => {
  fetchIncomeDetails()

  return () => {}
}, [])


  return (
    <DashboardLayout activeMenu='Income'>
      <div className='my-5 mx-auto' >
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions = {incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
              />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={
              (id) => {
                setOpenDeleteAlert({show: true, data:id})
              }
            }
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal 
          isOpen={OpenAddIncomeModal}
          onClose={ () => setOpenAddIncomeModal(false)}
          title= "Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show:false, data:null})}
          title="Delete Income"
        >
          <DeleteAlert 
            content="are you sure you want to delete this income"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income