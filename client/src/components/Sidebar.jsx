import React from "react";
import {
  BiHome,
  BiSolidUserAccount,
  BiPackage,
  BiHotel,
  BiCar,
  BiRestaurant,
  BiCalendarEvent,
  BiTrain,
} from "react-icons/bi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { NavLink } from "react-router-dom"; // Import NavLink from React Router
import "../assets/css/sidebar.css";
import logo from "../assets/img/Logo14.png";

export const Sidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <a href="/admin/dashbard" className="">
          <img src={logo} className="w-56" alt="Logo" />
        </a>
      </div>

      <div className="menu--list">
        <NavLink to="/admin/dashbard" activeClassName="active" className="item">
          <BiHome className="icon" />
          Dashboard
        </NavLink>
        <NavLink to="/admin/user" activeClassName="active" className="item">
          <BiSolidUserAccount className="icon" />
          User Management
        </NavLink>
        <NavLink to="/admin/packages" activeClassName="active" className="item">
          <BiPackage className="icon" />
          Package Management
        </NavLink>
        <NavLink to="/admin/hotels" activeClassName="active" className="item">
          <BiHotel className="icon" />
          Hotel Management
        </NavLink>
        <NavLink to="/admin/vehicle" activeClassName="active" className="item">
          <BiCar className="icon" />
          Vehicle Management
        </NavLink>
        <NavLink
          to="/admin/restaurant"
          activeClassName="active"
          className="item"
        >
          <BiRestaurant className="icon" />
          Restaurant Management
        </NavLink>
        <NavLink to="/admin/guid" activeClassName="active" className="item">
          <PiChalkboardTeacher className="icon" />
          Guid Management
        </NavLink>
        <NavLink to="/admin/events" activeClassName="active" className="item">
          <BiCalendarEvent className="icon" />
          Event Management
        </NavLink>
        <NavLink to="/admin/train" activeClassName="active" className="item">
          <BiTrain className="icon" />
          Train Management
        </NavLink>
      </div>
    </div>
  );
};
