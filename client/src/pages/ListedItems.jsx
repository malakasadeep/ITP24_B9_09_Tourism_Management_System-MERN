import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoChevronDownCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import tour_pkg from '../assets/img/icons/tour_pkg.png';
import hotel from '../assets/img/icons/hotel.png';
import restaurant from '../assets/img/icons/restaurant.png';
import vehicle from '../assets/img/icons/vehicle.png';
import event from '../assets/img/icons/event.png';
import tour_agent from '../assets/img/icons/tour-agent.png';


export default function ListedItems() {

    const[showPackageError, setShowPackageError] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [userPackages, setUserPackages] = useState([]);

    const handleShowPackages = async () => {
        try {
            setShowPackageError(false);
            const res = await fetch(`/api/user/packages/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowPackageError(true);
                 return;
            }
    
            setUserPackages(data);
        } catch (error) {
            setShowPackageError(true);
        }
      };
  return (
    <div className='flex items-center justify-center mt-32 container mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-14  '>
        
        <div className='rounded-xl shadow-lg w-100px h-auto bg-white '>
            <div className='p-5 flex flex-col'>
                <div className='flex flex-row rounded-xl overflow-hidden items-center gap-5'>
                    <img src={tour_pkg} alt="" className='w-20 h-20 object-contain'/>               
                    <h5 className='text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5'>My Tour Packages <IoChevronDownCircle /></h5>
                </div>
                <button onClick={handleShowPackages} className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out '>Explore  </button>
                <p className='text-red-700 mt-5'>
                    {showPackageError && 'Error showing listings' }
                </p>
                {userPackages && userPackages.length > 0 &&
                    <div className="flex flex-col gap-4">
                    <h1 className='text-center mt-7 text-4xl font-extralight'>Your Packages</h1>
                    {userPackages.map((pkg) => (
                        <div key={pkg._id} className='border border-blue-600 rounded-lg p-3 flex justify-between items-center gap-4 transition duration-300 ease-in-out hover:scale-105'>
                            <Link to={`/listing/${pkg._id}`}>
                                <img src={pkg.imageUrls[0]} alt='listing cover' className='h-20 w-20 object-contain'/>
                            </Link>
                            <Link className='text-slate-700 font-semibold  hover:underline truncate flex-1' to={`/listing/${pkg._id}`}>
                                <p className='text-2lg'>{pkg.title}</p>
                            </Link>

                            <div className='flex flex-row item-center gap-4'>
                                <button className='text-red-700  text-4xl hover:text-red-400 focus:scale-95 transition-all duration-200 ease-out '> <MdDeleteOutline /></button>
                                <button className='text-green-700 text-4xl hover:text-green-400 focus:scale-95 transition-all duration-200 ease-out '><FaRegEdit /></button>
                            </div>
                        </div>
                    ))}
                    </div>
                }
            </div>
        </div>


        <div className='rounded-xl shadow-lg w-100px h-auto bg-white '>
            <div className='p-5 flex flex-col'>
                <div className='flex flex-row  overflow-hidden items-center gap-5'>
                    <img src={hotel} alt="" className='w-20 h-20 object-contain'/>               
                    <h5 className='text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5'>My Hotel and Residence <IoChevronDownCircle /></h5>
                </div>
                <button  className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out '>Explore  </button>
            </div>
        </div>

        <div className='rounded-xl shadow-lg w-100px h-auto bg-white '>
            <div className='p-5 flex flex-col'>
                <div className='flex flex-row  overflow-hidden items-center gap-5'>
                    <img src={restaurant} alt="" className='w-20 h-20 object-contain'/>               
                    <h5 className='text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5'>My Restaurants <IoChevronDownCircle /></h5>
                </div>
                <button  className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out '>Explore  </button>
            </div>
        </div>


        <div className='rounded-xl shadow-lg w-100px h-auto bg-white '>
            <div className='p-5 flex flex-col'>
                <div className='flex flex-row  overflow-hidden items-center gap-5'>
                    <img src={vehicle} alt="" className='w-20 h-20 object-contain'/>               
                    <h5 className='text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5'>My Vehicles <IoChevronDownCircle /></h5>
                </div>
                <button className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out '>Explore  </button>
            </div>
        </div>


        <div className='rounded-xl shadow-lg w-100px h-auto bg-white '>
            <div className='p-5 flex flex-col'>
                <div className='flex flex-row  overflow-hidden items-center gap-5'>
                    <img src={event} alt="" className='w-20 h-20 object-contain'/>               
                    <h5 className='text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5'>My Events and Activities <IoChevronDownCircle /></h5>
                </div>
                <button className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out '>Explore  </button>
            </div>
        </div>


        <div className='rounded-xl shadow-lg w-100px h-auto bg-white '>
            <div className='p-5 flex flex-col'>
                <div className='flex flex-row  overflow-hidden items-center gap-5'>
                    <img src={tour_agent} alt="" className='w-20 h-20 object-contain'/>               
                    <h5 className='text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5'>My Tour Agent<IoChevronDownCircle /></h5>
                </div>
                <button  className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out '>Explore  </button>
            </div>
        </div>

        

    </div>
    </div>
    
  )
}
