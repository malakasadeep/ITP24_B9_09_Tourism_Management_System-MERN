import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation,Autoplay,Pagination } from 'swiper/modules';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/bundle';
import pkgbanner from '../../assets/img/bg/pkg-banner.jpg';
import loadingimg from '../../assets/img/loading.gif'
import personico from '../../assets/img/icons/package-page/person.png'
import family from '../../assets/img/icons/package-page/family.png'
import couple from '../../assets/img/icons/package-page/couple.png'
import culture from '../../assets/img/icons/package-page/culture.png'
import adventurer from '../../assets/img/icons/package-page/adventurer.png'
import wild from '../../assets/img/icons/package-page/wild.png'
import namaste from '../../assets/img/icons/package-page/namaste.png'
import dining from '../../assets/img/icons/package-page/dining.png'
import transport from '../../assets/img/icons/package-page/transport.png'
import days from '../../assets/img/icons/package-page/days.png'
import transfers from '../../assets/img/icons/package-page/transfers.png'
import hotels from '../../assets/img/icons/package-page/hotels.png'
import activities from '../../assets/img/icons/package-page/activities.png'
import best from '../../assets/img/icons/package-page/best.png'
import location from '../../assets/img/icons/package-page/location.png'
import spactivity from '../../assets/img/icons/package-page/spactivity.png'
import description from '../../assets/img/icons/package-page/description.png'
import policy from '../../assets/img/icons/package-page/policy.png'
import { useSelector } from 'react-redux';
import Contact from '../../components/tour-packages/Contact';
import Booking from '../../components/tour-packages/Booking';

export default function Hotel() {

    SwiperCore.use([Navigation, Autoplay, EffectCards, Pagination]);
    const [hotell, sethotel] = useState(null)
    const [ loading , setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const params = useParams();
    const {currentUser} = useSelector((state) => state.user)
    const [ contact, setContact ] = useState(false)
    

    useEffect(() => {
      const fetchhotel = async () =>{

        try {
          setLoading(true);
          const response = await fetch(`/api/hotels/get-update/${params.hotelId}`)
          const data = await response.json()
          if(data.success === false){
            setError(true)
            setLoading(false)
            return;
          }
          sethotel(data);
          setLoading(false)
          setError(false);
        } catch (error) {
          setError(true)
          setLoading(false)
        }
        
      };
      fetchhotel();
    }, [params.hotelId]);
  return (
    <div>
      <div style={{background:`url(${pkgbanner})center no-repeat`, backgroundSize:'cover', height: '400px'}} ></div>
      <main >
        {loading && 
        <div className='flex flex-col items-center justify-center'>
          <img src={loadingimg} alt="loading" className='w-28'/><p className='text-center my-7 text-2xl'>Loading...</p>
        </div>
        }
        {error && <p className='text-center my-7 text-2xl'>Something went wrong!!</p>}
        {hotell && !loading && !error && 
        <div className=''>
          <div className='w-[900px] h-auto ml-32 -mt-56 bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl '>
          <Swiper autoplay={{ delay: 3000 }} effect="cards" className='w-[600px] h-[400px] object-contain' >
            {hotell.hotelImgs.map((url) => (
              <SwiperSlide key={url} className='mt-10'>
                {/*<div className='h-[450px] ' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>*/}
                <img src={url} alt='pkgimages' className='shadow-2xl' />
              </SwiperSlide>
            ))
            }
          </Swiper>
          <div>
            <h1 className='mt-16 text-center font-semibold text-3xl text-blue-950'>
              {hotell.name}
            </h1>
          </div>
          <hr className='w-3/4 h-2 mx-auto my-4 bg-gray-100 border-0 rounded md:my-4 dark:bg-blue-950'/>

          <div className='flex items-center justify-center mt-2 container mx-auto'>
            <div  className='grid grid-cols-2 gap-x-36 gap-y-8'>

              <div>
              {hotell.type === '3 Star Hotel' ? (
                <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                <img src={couple} alt="" className='w-12 h-auto object-contain' />
                <div className='text-center'>
                  <p className='text-xl font-serif text-slate-900'>3 Star Hotel</p>
                  
                </div>
              </div>
                  ) :
                hotell.type === '4 Star Hotel' ? (
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={family} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-xl font-serif text-slate-900'>4 Star Hotel</p>
                   
                    </div>
                  </div>
                  ) :
                hotell.type === '5 Star Hotel'? (
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={personico} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-xl font-serif text-slate-900'>5 Star Hotel</p>
                  
                    </div>
                  </div>) :''}
              </div>


              
            </div>  
          </div>
          <div className='flex flex-col items-center justify-center mt-8 container mx-auto'>
            <div className='grid grid-cols-4 gap-x-4 gap-y-8'>
              <div>
                  {hotell.contactNo && (
                    <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={days} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-3xl font-serif text-slate-900'>{+hotell.contactNo}</p>
                      <p className='text-sm font-serif text-slate-700'>Contact Us</p>
                    </div>
                  </div>
                  )}
                </div>

                <div>
                  {hotell.numberOfRoom && (
                    <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={transfers} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-3xl font-serif text-slate-900'>{+hotell.numberOfRoom}</p>
                      <p className='text-sm font-serif text-slate-700'>Rooms Are Avalible</p>
                    </div>
                  </div>
                  )}
                </div>

                <div>
                  {hotell.distance && (
                    <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={hotels} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-3xl font-serif text-slate-900'>{+hotell.distance}</p>
                      <p className='text-sm font-serif text-slate-700'>From {+hotell.city} </p>
                    </div>
                  </div>
                  )}
                </div>

                <div>
                  {packagee.noofactivities && (
                    <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={activities} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-3xl font-serif text-slate-900'>{+packagee.noofactivities}</p>
                      <p className='text-sm font-serif text-slate-700'>Activities</p>
                    </div>
                  </div>
                  )}
                </div>
            </div>
          </div>
          <hr className='w-3/4 h-2 mx-auto my-4 bg-gray-100 border-0 rounded md:my-4 dark:bg-blue-950'/> 

          <div>
              {hotell.title && (
                <div>
                  <div className='flex flex-row  h-auto gap-4 mt-9 ml-9 mr-9 items-center justify-center'>
                  <img src={hotels} alt="" className='w-12 h-auto object-contain' />
                      <p className='text-xl font-serif text-slate-700'>: </p>                        
                  </div>
                  <p className='text-sm font-serif text-slate-900 m-7 mt-0 text-center justify-center'>{packagee.title}</p>
                </div>
                
                )}
            </div> 

            <div>
              {hotell.address && (
                <div>
                  <div className='flex flex-row h-auto gap-4 mt-9 ml-9 mr-9 items-center justify-center'>
                  <img src={location} alt="" className='w-12 h-auto object-contain' />
                      <p className='text-xl font-serif text-slate-700'>Locations: </p>                        
                  </div>
                  <p className='text-sm font-serif text-slate-900 m-7 mt-0 text-center justify-center'>{hotell.address}</p>
                </div>
                
                )}
            </div> 

          

            <div>
              {hotell.description && (
                <div>
                  <div className='flex flex-row h-auto gap-4 mt-9 ml-9 mr-9 justify-center items-center'>
                    <img src={description} alt="" className='w-12 h-auto object-contain' />
                    <p className='text-xl font-serif text-slate-900 '>Description: </p>                        
                  </div>
                  <p className='text-sm font-serif text-slate-700 m-7 mt-0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{hotell.description}</p>
                </div>
                
                )}
            </div>

          
            <hr className='w-3/4 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-blue-950'/>
          </div>
          <div className='absolute top-0 right-0 mt-[550px] mr-[30px] w-[400px] h-auto  bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl'>
          <div>
                  {
                  (<div>
                      <div className=' grid grid-cols-2 justify-between gap-x-3 gap-y-3 items-center m-4'>
                      <div>
                            <p className='font-serif text-4xl text-blue-700'> 01 Day</p>
                      </div>
                      <div className='text-center'>
                            <p className='font-semibold font-serif text-5xl text-slate-800'>$ {hotell.price}</p>
                           
                            
                      </div>
                      <div className='mt-7'>
                            <p className='font-extralight font-serif text-base text-slate-600'>Reguler Price</p>
                      </div>
                      <div className='text-center mt-7'>
                            <p className='font-thin font-serif text-2xl text-slate-800'>$ {hotell.price}</p>
                      </div>
                    
                      <hr className='w-full h-2  bg-gray-100 border-0 rounded  dark:bg-blue-950'/> 
                      <hr className='w-full h-2  bg-gray-100 border-0 rounded  dark:bg-blue-950'/> 
                      <div>
                           
                      </div>
                    
                      
                      </div>
                 
                      <div>
                        {currentUser && currentUser.usertype === 'Tourist' && (
                          <div>
                            <Booking/>
                          </div>
                        )}
                      </div>
                    </div>)}
                </div>
          </div>

          <div className='absolute top-[1000px] right-[30px] w-[400px]'>
            {currentUser && currentUser.usertype === 'Tourist' && !contact && (
              <div>
                <button className='bg-sky-800 text-white font-serif rounded-lg uppercase hover:opacity-95 p-3 w-[400px]' onClick={()=>setContact(true)}>Contact for more details.</button>
              </div>
            )}
            {contact && <HotelContact hotell={hotell}/>}
          </div>

        </div>
        }
      </main>
    </div>
  )
}
