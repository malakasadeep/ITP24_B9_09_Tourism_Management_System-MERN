import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./../../assets/css/header.css";
import logo from "../../assets/img/Logo14.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <header>
        <a href="/" className="">
          <img src={logo} className="w-56" />
        </a>
        <ul className="navigation">
          <li>
            <Link to="/" className="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/package-search">Packaages</Link>
          </li>
          <li>
            <Link to="/hotel-search">Hotels</Link>
          </li>
          <li>
            <Link to="/VehicleHome">Vehicles</Link>
          </li>
          <li>
            <Link to="/restaurants">Restourents</Link>
          </li>
          <li>
            <Link to="/guid/search">Tour Guides</Link>
          </li>
          <li>
            <Link to="/events/search/">Events</Link>
          </li>
          <li>
            <Link to="/train/search">Trains</Link>
          </li>

          <Link to="/profile">
            {currentUser && currentUser.usertype === "Tourist" ? (
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
  );
}
