import React from 'react'
import { AdminHeader } from './AdminHeader'
import '../assets/css/adminContent.css'
import { AdminCard } from './AdminCard'


export const AdminContent = () => {
  return (
    <div className='content'>
        <AdminHeader/>
        <AdminCard/>
    </div>
  )
}
