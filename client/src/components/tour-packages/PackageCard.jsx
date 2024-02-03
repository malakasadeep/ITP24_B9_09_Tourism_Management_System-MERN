import React from 'react'
import { Link } from 'react-router-dom'
import days from '../../assets/img/icons/package-page/days.png'
import hotels from '../../assets/img/icons/package-page/hotels.png'
import activities from '../../assets/img/icons/package-page/activities.png'
import personico from '../../assets/img/icons/package-page/person.png'
import family from '../../assets/img/icons/package-page/family.png'
import couple from '../../assets/img/icons/package-page/couple.png'


export default function PackageCard({pkg}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[330px] h-auto'>
        <Link to={`/packages/${pkg._id}`}>
            <img src={pkg.imageUrls[0]} className='h-[320px] sm:h-[220px] w-full hover:scale-105 transition-scale duration-300'/>
            <div>
                
          <div className='flex flex-col items-center justify-center container'>
            <div className='grid grid-cols-3 gap-x-1 gap-y-1'>
              <div>
                  
                    <div className='flex flex-row items-center gap-1  rounded-lg'>
                    <img src={days} alt="" className='w-7 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-lg font-light text-slate-900'>{+pkg.days}</p>
                      <p className='text-sm text-slate-700'>Days</p>
                    </div>
                  </div>
                  
                </div>

                <div>
                  
                    <div className='flex flex-row items-center gap-1   rounded-lg'>
                    <img src={hotels} alt="" className='w-7 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-lg font-light text-slate-900'>{+pkg.noofhotels}</p>
                      <p className='text-sm text-slate-700'>Hotels</p>
                    </div>
                  </div>
                  
                </div>

                <div>
                  
                    <div className='flex flex-row items-center gap-1  rounded-lg'>
                    <img src={activities} alt="" className='w-7 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-lg font-light text-slate-900'>{+pkg.noofactivities}</p>
                      <p className='text-sm text-slate-700'>Activities</p>
                    </div>
                  </div>
                  
                </div>
            </div>
          </div>
            </div>
            <div className='p-1'>
                <p className='truncate text-xl font-semibold text-blue-950'>{pkg.title}</p>
            </div>

            <div className='ml-4'>
              {pkg.type === 'couple' ? (
                <div className='flex flex-row items-center gap-1 p-1 rounded-lg'>
                <img src={couple} alt="" className='w-5 h-auto object-contain' />
                <div className='text-center'>
                  <p className='text-base font-light text-slate-900'>Cuple Package</p> 
                </div>
              </div>
                  ) :
                pkg.type === 'family' ? (
                  <div className='flex flex-row items-center gap-1   p-1 rounded-lg'>
                    <img src={family} alt="" className='w-5 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-base font-light text-slate-900'>Family Package</p>
                    </div>
                  </div>
                  ) :
                pkg.type === 'reguler'? (
                  <div className='flex flex-row items-center gap-1 p-1 rounded-lg'>
                    <img src={personico} alt="" className='w-5 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-base font-light text-slate-900'>Reguler Package</p>
                    </div>
                  </div>) :''} 
              </div>
              <div className='text-center'>
                  <div className='text-center'>
                            <p className='font-semibold text-2xl text-white bg-blue-900'>$ {pkg.price}</p>
                            {pkg.type === 'reguler' ? (<p className='text-sm'>Per Person</p>) :
                            pkg.type === 'couple' ? (<p className='text-sm'>Per two Person</p>):
                            pkg.type === 'family' ? (<p className='text-sm'>Per four Person</p>):''}
                            
                      </div>
                  </div>
        </Link>
    </div>
  )
}
