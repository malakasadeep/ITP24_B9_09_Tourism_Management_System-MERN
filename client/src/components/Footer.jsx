import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
    
  return (
    <>
    <hr className='w-3/4 h-5 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-blue-950'/>
			<div className="bg h-1/2 w-auto flex md:flex-row flex-col justify-around items-start p-2">
                
				<div className="p-5 ">
					<ul>
						<p className="text-gray-800 font-bold text-3xl pb-6">
						Venture<span className="text-cyan-500">Vibes</span>
						</p>
						<div className="flex gap-6 pb-5">
							<FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
							<FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-neutral-700 font-bold text-2xl pb-4">Our Services</p>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Hotels
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Tour Packages
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Upcoming Events
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Restaurants
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-neutral-700 font-bold text-2xl pb-4">Quick Links</p>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							About Us
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Contact Us
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Terms & Conditions
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Privacy Policy
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Subscribe
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-neutral-700 font-bold text-2xl pb-4">Other Sites</p>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Sri Lanka Tourism Development Authority
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Sri Lanka Tourism Convention Bureau
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Ministry of Tourism
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							SriLankan Airlines
						</li>
						<li className="text-sky-500 text-md pb-2  hover:text-white cursor-pointer">
							Tourist Hotels Association of Sri Lanka
						</li>
					</ul>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center text-center  p-5 bg-blue-950">
				<h1 className=" text-gray-400 ">
					© 2023-2024 All rights reserved || VentureVibes.com
				</h1>
			</div>
		</>
  )
}
