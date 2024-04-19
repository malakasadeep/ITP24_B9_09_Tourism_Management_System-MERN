import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import logo from "../../assets/img/Logo14.png";
import "./../../assets/css/header.css";

export default function SellerHeader() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <>
        <header>
          <a href="/additems" className="">
            <img src={logo} className="w-56" />
          </a>
          <ul className="navigation">
            <li>
              <Link to="/additems" className="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/my-items">My Items</Link>
            </li>
            <li>
              <Link to="#">Events</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>

            <Link to="/seller/profile">
              {currentUser &&
              currentUser.usertype === "Travel Service Providers" ? (
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="rounded-full h-10 w-10 object-cover ml-16 transition duration-300 ease-in-out hover:scale-125"
                />
              ) : (
                <button className="bg-blue-950 w-36  text-white hover:bg-blue-500 transition duration-300 ease-in-out hover:text-black rounded-full p-2 ml-16 ">
                  Sign In
                </button>
              )}
            </Link>
          </ul>
        </header>
      </>
    </>
  );
}
