import React from 'react'
import { BiHome, BiBookAlt, BiSolidUserAccount, BiPackage, BiHotel, BiCar, BiRestaurant, BiCalendarEvent, BiTrain} from 'react-icons/bi';
import { PiChalkboardTeacher } from "react-icons/pi";
import '../assets/css/sidebar.css'

export const Sidebar = () => {
  return (
    <div className='menu'>
        <div className='logo'>
            <BiBookAlt className='logo-icon'/>
            <h1>TourCraft</h1>
        </div>

        <div className="menu--list">
            <a href="/admin" className="item">
                <BiHome  className='icon'/>
                Dashboard
            </a>
            <a href="/admin/user" className="item">
                <BiSolidUserAccount  className='icon'/>
                User Management
            </a>
            <a href="" className="item">
                <BiPackage className='icon'/>
                Package Management
            </a>
            <a href="" className="item">
                <BiHotel className='icon'/>
                Hotel Management
            </a>
            <a href="" className="item">
                <BiCar className='icon'/>
                Vehicle Management
            </a>
            <a href="" className="item">
                <BiRestaurant className='icon'/>
                Restourent Management
            </a>
            <a href="" className="item">
                <PiChalkboardTeacher className='icon'/>
                Guid Management
            </a>
            <a href="" className="item">
                <BiCalendarEvent className='icon'/>
                Event Management
            </a>
            <a href="" className="item">
                <BiTrain className='icon'/>
                Train Management
            </a>

        </div>
    </div>
  )
}
