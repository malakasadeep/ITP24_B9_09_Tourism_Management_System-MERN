import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import addpkgimg from '../assets/img/addpkgimg.jpg'
import addhotelimg from '../assets/img/addhotelimg.jpg'
import addresturentimg from '../assets/img/addresturentimg.jpg'
import addvehiimg from '../assets/img/addvehiimg.jpg'
import addagentimg from '../assets/img/addagentimg.jpg'
import pkgbanner from '../assets/img/bg/pkg-banner.jpg';

export default function AddItems() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <div style={{background:`url(${pkgbanner})center no-repeat`, backgroundSize:'cover', height: '400px'}} ></div>
      <div className='-mt-48'>
      {/*<h1 className='text-5xl font-sans font-extrabold mt-24 text-center bg-gradient-to-br from-red-500 to-purple-600 text-transparent bg-clip-text'>Hi, {currentUser.firstname || currentUser.username}</h1>
      <h1 className='text-4xl font-sans font-semibold text-center border-blue-800 text-white'>Add your own Business here....👉👉</h1>*/}
      <div className='flex items-center justify-center mt-2 container mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16'>
        <div className='rounded-xl shadow-lg w-80 h-auto bg-white transition duration-300 ease-in-out hover:scale-105'>
          <div className='p-5 flex flex-col'>
            <div className='rounded-xl overflow-hidden'>
              <img src={addpkgimg} alt='addpkgimg' className='h-64 w-80'/>
            </div>
            <h5 className='text-slate-800 text-2xl md:text-3xl font-medium mt-3'>Add new Package</h5>
            <p className='text-cyan-900 text-lg mt-3'>The "Add Package" web page lets users easily suggest and describe new travel packages, actively contributing to the platform's diverse offerings.</p>
            <Link to={"/create-package"} className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out'>Explore</Link>
          </div>
        </div>

        <div className='rounded-xl shadow-lg w-80 h-auto bg-white transition duration-300 ease-in-out hover:scale-105'>
          <div className='p-5 flex flex-col'>
            <div className='rounded-xl overflow-hidden'>
              <img src={addhotelimg} alt='addhotelimg' className='h-64 w-80'/>
            </div>
            <h5 className='text-slate-800 text-2xl md:text-2xl font-medium mt-3'>Add Hotel and Residence</h5>
            <p className='text-slate-500 text-lg mt-3'>The "Add Package" web page lets users easily suggest and describe new travel packages, actively contributing to the platform's diverse offerings.</p>
            <Link to={"/create-package"} className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out'>Explore</Link>
          </div>
        </div>

        <div className='rounded-xl shadow-lg w-80 h-auto bg-white transition duration-300 ease-in-out hover:scale-105'>
          <div className='p-5 flex flex-col'>
            <div className='rounded-xl overflow-hidden'>
              <img src={addresturentimg} alt='addresturentimg' className='h-64 w-80'/>
            </div>
            <h5 className='text-slate-800 text-2xl md:text-3xl font-medium mt-3'>Add Restaurants</h5>
            <p className='text-slate-500 text-lg mt-3'>The "Add Package" web page lets users easily suggest and describe new travel packages, actively contributing to the platform's diverse offerings.</p>
            <Link to={"/create-package"} className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out'>Explore</Link>
          </div>
        </div>

        <div className='rounded-xl shadow-lg w-80 h-auto bg-white transition duration-300 ease-in-out hover:scale-105'>
          <div className='p-5 flex flex-col'>
            <div className='rounded-xl overflow-hidden'>
              <img src={addvehiimg} alt='addvehiimg' className='h-64 w-80'/>
            </div>
            <h5 className='text-slate-800 text-2xl md:text-3xl font-medium mt-3'>Add Vehicles</h5>
            <p className='text-slate-500 text-lg mt-3'>The "Add Package" web page lets users easily suggest and describe new travel packages, actively contributing to the platform's diverse offerings.</p>
            <Link to={"/create-package"} className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out'>Explore</Link>
          </div>
        </div>

        <div className='rounded-xl shadow-lg w-80 h-auto bg-white transition duration-300 ease-in-out hover:scale-105'>
          <div className='p-5 flex flex-col'>
            <div className='rounded-xl overflow-hidden'>
              <img src={addvehiimg} alt='addvehiimg' className='h-64 w-80'/>
            </div>
            <h5 className='text-slate-800 text-2xl md:text-3xl font-medium mt-3'>Add Vehicles</h5>
            <p className='text-slate-500 text-lg mt-3'>The "Add Package" web page lets users easily suggest and describe new travel packages, actively contributing to the platform's diverse offerings.</p>
            <Link to={"/create-package"} className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out'>Explore</Link>
          </div>
        </div>

        <div className='rounded-xl shadow-lg w-80 h-auto bg-white transition duration-300 ease-in-out hover:scale-105'>
          <div className='p-5 flex flex-col'>
            <div className='rounded-xl overflow-hidden'>
              <img src={addagentimg} alt='addagentimg' className='h-64 w-80'/>
            </div>
            <h5 className='text-slate-800 text-2xl md:text-3xl font-medium mt-3'>Add Tour Agent</h5>
            <p className='text-slate-500 text-lg mt-3'>The "Add Package" web page lets users easily suggest and describe new travel packages, actively contributing to the platform's diverse offerings.</p>
            <Link to={"/create-package"} className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out'>Explore</Link>
          </div>
        </div>


        <div className='rounded-xl shadow-lg w-80 h-auto bg-white transition duration-300 ease-in-out hover:scale-105'>
          <div className='p-5 flex flex-col'>
            <div className='rounded-xl overflow-hidden'>
              <img src={addvehiimg} alt='addvehiimg' className='h-64 w-80'/>
            </div>
            <h5 className='text-slate-800 text-2xl md:text-3xl font-medium mt-3'>Add Events</h5>
            <p className='text-slate-500 text-lg mt-3'>The "Add Package" web page lets users easily suggest and describe new travel packages, actively contributing to the platform's diverse offerings.</p>
            <Link to={"/events/create"} className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out'>Explore</Link>
          </div>
        </div>

        


      </div>
      </div>
      </div>
      
    </div>
  )
}
