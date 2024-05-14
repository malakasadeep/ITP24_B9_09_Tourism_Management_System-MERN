import React from 'react'
import { Link } from 'react-router-dom'
import { LuHotel } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { RxActivityLog } from "react-icons/rx";
import {  FaStar } from "react-icons/fa";


const VehicleCard = (props) => {

  return (
    <div className='frame'>
    <div className='border-collapse- shadow-md hover:shadow-lg transition-colors overflow-hidden rounded-lg w-[330px] h-auto backdrop-blur-md' >
       <Link to={`/Vehicle/book/${props.id}`}>
            
            <img src={props.image} className='h-[320px] sm:h-[220px] w-full hover:scale-105 transition-scale duration-300'/>
            <div>
                
          <div className='flex flex-col items-center justify-center container '>
            <div className='grid grid-cols-3 gap-x-1 gap-y-1'>
              <div>
                  
                    <div className='flex flex-row items-center gap-1  rounded-lg'>
                    <SlCalender />

                    <div className='text-center'>
                      <p className='text-sm font-light text-black'>{+props.seats}</p>
                      <p className='text-xs text-black'>seats</p>
                    </div>
                  </div>
                  
                </div>

                <div>
                  
                    <div className='flex flex-row items-center gap-1   rounded-lg'>
                    <LuHotel />
                    <div className='text-center'>
                      <p className='text-sm font-light text-black'>{+props.capacity}</p>
                      <p className='text-xs text-black'>CC</p>
                    </div>
                  </div>
                  
                </div>

                <div>
                  
                    <div className='flex flex-row items-center gap-1  rounded-lg'>
                    <RxActivityLog />
                    <div className='text-center'>
                      <p className='text-sm font-light text-black'>{props.transmission}</p>
                     
                    </div>
                  </div>
                  
                </div>
            </div>
          </div>
            </div>
            <div className='p-1'>
                <p className='truncate text-xl font-semibold text-black'>{props.brand}  {props.model}</p>
            </div>

         
              <div className='text-center'>
                  <div className='text-center'>
                            <p className='font-semibold text-2xl text-white bg-blue-400 '>$ {props.price}</p>
                            
                            
                      </div>
                  </div>
        </Link>
        </div>
    </div>
  )
}

export default VehicleCard