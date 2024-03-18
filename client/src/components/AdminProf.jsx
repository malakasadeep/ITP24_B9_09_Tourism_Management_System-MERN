import React from 'react'
import { AdminProfHeader } from './AdminProfHeader'
import '../assets/css/adminprofile.css'
import { useSelector } from 'react-redux';

export const AdminProf = () => {

  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='profile'>
      <AdminProfHeader/>

      <div className="user--profile">
        <div className="user--detail">
          <img src={currentUser.avatar} alt=''/>
          <h3 className='username text-2xl font-semibold text-slate-500'>{currentUser.firstname ?  (<h3>{currentUser.firstname}</h3>) : (<h3>{currentUser.username}</h3>) }</h3>
          <span className=''>Admin</span>
        </div>

        <div className="user--action">
            
        </div>
      </div>
    </div>
  )
}
