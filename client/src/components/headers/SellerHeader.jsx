import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'



export default function SellerHeader() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div >
    <nav className='flexbetween max-container px-12 z-30 py-2 shadow-xl bg-blue-400 rounded-xl ring-1 ring-blue-300 fixed w-[95%] left-[50%] top-1 translate-x-[-50%]'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between h-10'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <Link to={'/'}>
              <span className='text-white text-2xl' >LOGO</span>
            </Link>
          </div>
        </div>
        <div className='hidden md:block'>
          <div className='ml-4 flex items-center space-x-4'>
            <Link to={'/'}>
              <span className='text-blue-900 hover:bg-blue-500 hover:text-blue-200 rounded-lg p-2 text-lg'>Home</span>
            </Link>

            <Link to={'/'}>
              <span className='text-blue-900 hover:bg-blue-500 hover:text-blue-200 rounded-lg p-2 text-lg'>Add items</span>
            </Link>

            <Link to={'/'}>
              <span className='text-blue-900 hover:bg-blue-500 hover:text-blue-200 rounded-lg p-2 text-lg'>My items</span>
            </Link>

            <Link to={'/'}>
              <span className='text-blue-900 hover:bg-blue-500 hover:text-blue-200 rounded-lg p-2 text-lg'>Contact us</span>
            </Link>

            <Link to='/selprofile'>
                {currentUser ? (
                    <img src={currentUser.avatar} alt = 'profile' className='rounded-full h-10 w-10 object-cover ml-16'/>
                ) : (
                    <button className='bg-blue-950 w-36 rounded-full text-white hover:bg-blue-500 hover:text-black p-2 ml-16 '>Sign In</button>
                    )
                }
            </Link>
          </div>

        </div>
      </div>
    </div>
    </nav>
</div>
  )
}
