import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
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
              <span className='text-blue-900 hover:bg-blue-500 transition duration-300 ease-in-out hover:text-blue-200 rounded-full p-2 text-lg'>Home</span>
            </Link>

            <Link to={'/'}>
              <span className='text-blue-900 hover:bg-blue-500 transition duration-300 ease-in-out hover:text-blue-200 rounded-full p-2 text-lg'>Packages</span>
            </Link>

            <Link to={'/'}>
              <span className='text-blue-900 hover:bg-blue-500 transition duration-300 ease-in-out hover:text-blue-200 rounded-full p-2 text-lg'>Hotels</span>
            </Link>

            <Link to={'/'}>
              <span className='text-blue-900 hover:bg-blue-500 transition duration-300 ease-in-out hover:text-blue-200 rounded-full p-2 text-lg'>Book a train</span>
            </Link>

            <Link to='/profile'>
                {currentUser ? (
                    <img src={currentUser.avatar} alt = 'profile' className='rounded-full h-10 w-10 object-cover ml-16'/>
                ) : (
                    <button className='bg-blue-950 w-36  text-white hover:bg-blue-500 transition duration-300 ease-in-out hover:text-black rounded-full p-2 ml-16 '>Sign In</button>
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
