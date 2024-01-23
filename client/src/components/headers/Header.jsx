import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { FaTimes, FaBars } from "react-icons/fa";

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [navbar, setNavbar] = useState(false);
  const Navbar = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Portfolio",
      link: "/portfolio",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  return (
    <>
    <nav className="w-full h-auto bg-blue-900 lg:px-24 md:px-16 sm:px-14 px-12 py-2 shadow-md z-30 flexbetween max-container  ">
      <div className="justify-between mx-auto lg:w-full md:items-center md:flex">
        {/* Navbar logo & toggle button section */}
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            {/* Logo section */}
            <Link className="text-3xl text-orange-500 font-semibold tracking-[0.1rem]">
              TNavbar
            </Link>
            {/* Toggle button section  (we will do it later) */}
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none border border-transparent focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <FaTimes
                    className="text-gray-400 cursor-pointer"
                    size={24}
                  />
                ) : (
                  <FaBars
                    className="text-gray-400 cursor-pointer"
                    size={24}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* NAvbar menu items section */}
        <div
          className={`flex justify-between items-center md:block ${
            navbar ? "block" : "hidden"
          }`}
        >
          <ul className="list-none lg:flex md:flex sm:block block gap-x-5 gap-y-16">
            {Navbar.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="text-gray-400 text-[1.15rem] font-medium tracking-wider hover:text-gray-200 ease-out duration-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <Link to='/profile'>
                {currentUser ? (
                    <img src={currentUser.avatar} alt = 'profile' className='rounded-full h-10 w-10 object-cover ml-16 transition duration-300 ease-in-out hover:scale-125'/>
                ) : (
                    <button className='bg-blue-950 w-36  text-white hover:bg-blue-500 transition duration-300 ease-in-out hover:text-black rounded-full p-2 ml-16 '>Sign In</button>
                    )
                }
            </Link>
            
          </ul>
        </div>
      </div>
    </nav>
  </>
  )
}
