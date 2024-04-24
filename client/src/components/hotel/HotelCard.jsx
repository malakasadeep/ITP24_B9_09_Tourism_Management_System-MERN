import React from "react";
import { Link } from "react-router-dom";
import "./../../assets/css/Home.css";
import { LuHotel } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import hotelphoto from '../../assets/img/icons/hotel/hotel.png'
import { RxActivityLog } from "react-icons/rx";

import { SlLocationPin } from "react-icons/sl";
import { CiLocationArrow1 } from "react-icons/ci";
import { TbStars } from "react-icons/tb";
export default function HotelCard({ hotell }) {
  return (
    <div className="frame">
      <div className="border-collapse- shadow-md hover:shadow-lg transition-colors overflow-hidden rounded-lg w-[330px] h-auto backdrop-blur-md">
        <Link to={`/Hotel/${hotell._id}`}>
          <img
            src={hotell.hotelImgs[0]}
            className="h-[320px] sm:h-[220px] w-full hover:scale-105 transition-scale duration-300"
          />
          <div>
            <div className="flex flex-col items-center justify-center container ">
              <div className="grid grid-cols-3 gap-x-1 gap-y-1">
                <div>
                  <div className="flex flex-row items-center gap-1  rounded-lg">
                  <CiLocationArrow1 />


                    <div className="text-center">
                      <p className="text-sm font-light text-black">
                        {hotell.city}
                      </p>
                     
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-row items-center gap-1   rounded-lg">
                  <SlLocationPin />
                    <div className="text-center">
                      <p className="text-sm font-light text-black">
                        {hotell.province}
                      </p>
                   
                    </div>
                  </div>
                </div>
                <div>
                  
                  <div className='flex flex-row items-center gap-1  rounded-lg'>
                  < TbStars />
                  <div className='text-center'>
                    <p className='text-sm font-light text-black'>{hotell.type}</p>
                  </div>
                </div>
                
              </div>
              </div>
            </div>
          </div>
          <div className="p-1">
            <p className="truncate text-xl font-semibold text-black">
              {hotell.title}
            </p>
          </div>
          <div className='flex flex-row items-center gap-1 p-1 rounded-lg'>
          <img src={hotelphoto} alt="" className='w-5 h-auto object-contain' />
                  <div className='text-center'>
                 
                            <p className='font-semibold  text-black text-base '>{hotell.name}</p>
                            
                            
                      </div>
                  </div>

          <div className="text-center">
            <div className="text-center">
              <p className="font-semibold text-2xl text-white bg-blue-400 ">
                $ {+hotell.price}
              </p>
            </div>
          </div>
          <div className='text-center'>
                  <div className='text-center'>
                            <p className='font-semibold text-sm text-black '>{hotell.availableWork}</p>
                            
                            
                      </div>
                  </div>
        </Link>
      </div>
    </div>
  );
}
