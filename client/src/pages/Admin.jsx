import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { AdminContent } from '../components/AdminContent'
import { AdminProf } from '../components/AdminProf'

import '../assets/css/sidebar.css'
import { Route, Routes } from 'react-router-dom'
import { AdminUM } from '../components/user/AdminUM'

export default function Admin() {
  return (
    <div className='dashboard' style={{background:'#dde6ed', padding:'20px'}}>
      <Sidebar />
      <div className="dashboard--content">
        <Routes>
          <Route path='/' element={<AdminContent/>} />
        </Routes>
        <AdminProf/>
      </div>
        
    </div>
  )
}
