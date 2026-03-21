import React from 'react'
import { LuArrowRight } from 'react-icons/lu'

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Transactions</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div>

          {transactions?.slice(0,5)?.map( (item) => (
            <TransactionInfoCard 
            key = {item._id}
            title = {item.type == 'expense' ? item.category : item.source}
            iocn = {item.icon}
            date = {moment(item.date).format('do MMM YYYY')}
            amount = {item.amount}
            type
            />
          ))}

        </div>
    </div>
  )
}

export default RecentTransactions