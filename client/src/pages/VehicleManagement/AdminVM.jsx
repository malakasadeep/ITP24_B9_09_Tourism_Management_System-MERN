import React from 'react'
import { AdminCard } from '../../components/AdminCard'
import { VehicleList } from '../../components/VehicleManagement/VehicleList'

import '../../assets/css/adminContent.css'
import { Sidebar } from '../../components/Sidebar'
import { Route, Routes } from 'react-router-dom'

export default function AdminVM() {
  return (
    <div className='dashboard' style={{background:'#dde6ed', padding:'20px'}}>
        <Sidebar/>
        <div className="dashboard--content">
            <div>
            <Routes>
                <Route path='/' element={<VehicleList/>} />
            </Routes>
            </div>
        </div>    
    </div>
    
  )
}
