import React from 'react'
import { BiEdit } from 'react-icons/bi'

export const AdminProfHeader = () => {
  return (
    <div className='profile--header'>
        <h2 className='header--title'>Profile</h2>
        <a href='admin/profile' >
            <div className='edit'>
                <BiEdit className ='icon'/>
            </div>
        </a>
        
    </div>
  )
}
