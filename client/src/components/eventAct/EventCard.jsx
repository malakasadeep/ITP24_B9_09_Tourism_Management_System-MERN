import React from 'react'
import { Link } from 'react-router-dom'

export const EventCard = ({evnt}) => {
  return (
    <div className='frame'>
    <div className='border-collapse- shadow-md hover:shadow-lg transition-colors overflow-hidden rounded-lg w-[330px] h-auto backdrop-blur-md' >
        <Link to={`/events/${evnt._id}`}>
        <img src={evnt.imageUrls[0]} className='h-[320px] sm:h-[220px] w-full hover:scale-105 transition-scale duration-300'/>
            <div>
                
          {/* <div className='flex flex-col items-center justify-center container '>
            <div className='grid grid-cols-3 gap-x-1 gap-y-1'>
              <div>
                  
                    <div className='flex flex-row items-center gap-1  rounded-lg'>
                    <SlCalender />

                    <div className='text-center'>
                      <p className='text-sm font-light text-black'>{+pkg.days}</p>
                      <p className='text-xs text-black'>Days</p>
                    </div>
                  </div>
                  
                </div>

                <div>
                  
                    <div className='flex flex-row items-center gap-1   rounded-lg'>
                    <LuHotel />
                    <div className='text-center'>
                      <p className='text-sm font-light text-black'>{+pkg.noofhotels}</p>
                      <p className='text-xs text-black'>Hotels</p>
                    </div>
                  </div>
                  
                </div>

                <div>
                  
                    <div className='flex flex-row items-center gap-1  rounded-lg'>
                    <RxActivityLog />
                    <div className='text-center'>
                      <p className='text-sm font-light text-black'>{+pkg.noofactivities}</p>
                      <p className='text-xs text-black'>Activities</p>
                    </div>
                  </div>
                  
                </div>
            </div>
          </div> */}
            </div>
            <div className='p-1'>
                <p className='truncate text-xl font-semibold text-black'>{evnt.title}</p>
            </div>

            <div className='ml-4'>
              <p className='text-base font-light text-black'>{evnt.location}</p>

              {/* {pkg.type === 'couple' ? (
                <div className='flex flex-row items-center gap-1 p-1 rounded-lg'>
                <img src={couple} alt="" className='w-5 h-auto object-contain' />
                <div className='text-center'>
                  <p className='text-base font-light text-black'>Cuple Package</p> 
                </div>
              </div>
                  ) :
                pkg.type === 'family' ? (
                  <div className='flex flex-row items-center gap-1   p-1 rounded-lg'>
                    <img src={family} alt="" className='w-5 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-base font-light text-black'>Family Package</p>
                    </div>
                  </div>
                  ) :
                pkg.type === 'reguler'? (
                  <div className='flex flex-row items-center gap-1 p-1 rounded-lg'>
                    <img src={personico} alt="" className='w-5 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-base font-light text-black'>Reguler Package</p>
                    </div>
                  </div>) :''}  */}
              </div>
              <div className='text-center'>
                  <div className='text-center'>
                            <p className='font-semibold text-2xl text-white bg-blue-400 '>$ {evnt.price}</p>
                            {evnt.type === 'Event' ? (<p className='text-sm'>Event</p>) :
                            evnt.type === 'Activity' ? (<p className='text-sm'>Activity</p>):''}
                            
                  </div>
              </div>
        </Link>

        </div>

    </div>
  )
}
