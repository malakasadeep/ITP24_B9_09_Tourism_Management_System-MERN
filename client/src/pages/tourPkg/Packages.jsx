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

export default function Packages() {

    SwiperCore.use([Navigation, Autoplay, EffectCards, Pagination]);
    const [packagee, setPackagee] = useState(null)
    const [ loading , setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const params = useParams();
    const {currentUser} = useSelector((state) => state.user)
    const [ contact, setContact ] = useState(false)
    

    useEffect(() => {
      const fetchPackage = async () =>{

        try {
          setLoading(true);
          const response = await fetch(`/api/Package/get-update/${params.packageId}`)
          const data = await response.json()
          if(data.success === false){
            setError(true)
            setLoading(false)
            return;
          }
          setPackagee(data);
          setLoading(false)
          setError(false);
        } catch (error) {
          setError(true)
          setLoading(false)
        }
        
      };
      fetchPackage();
    }, [params.packageId]);
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
        {packagee && !loading && !error && 
        <div className=''>
          <div className='w-[900px] h-auto ml-32 -mt-56 bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl'>
          <Swiper autoplay={{ delay: 3000 }} effect="cards" className='w-[600px] h-[400px] object-contain' >
            {packagee.imageUrls.map((url) => (
              <SwiperSlide key={url} className='mt-10'>
                {/*<div className='h-[450px] ' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>*/}
                <img src={url} alt='pkgimages' className='shadow-2xl' />
              </SwiperSlide>
            ))
            }
          </Swiper>
          <div>
            <h1 className='mt-16 text-center font-semibold text-3xl text-blue-950'>
              {packagee.title}
            </h1>
          </div>
          <hr className='w-3/4 h-2 mx-auto my-4 bg-gray-100 border-0 rounded md:my-4 dark:bg-blue-950'/>

          <div className='flex items-center justify-center mt-2 container mx-auto'>
            <div  className='grid grid-cols-2 gap-x-36 gap-y-8'>

              <div>
              {packagee.type === 'couple' ? (
                <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                <img src={couple} alt="" className='w-12 h-auto object-contain' />
                <div className='text-center'>
                  <p className='text-xl font-light text-slate-900'>Cuple Package</p>
                  <p className='text-base text-slate-700'>For Two Person</p>
                </div>
              </div>
                  ) :
                packagee.type === 'family' ? (
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={family} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-xl font-light text-slate-900'>Family Package</p>
                      <p className='text-base text-slate-700'>For Four Person</p>
                    </div>
                  </div>
                  ) :
                packagee.type === 'reguler'? (
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={personico} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-xl font-light text-slate-900'>Reguler Package</p>
                      <p className='text-base text-slate-700'>For one Person</p>
                    </div>
                  </div>) :''}
              </div>


              <div>
                {packagee.category === 'Culture' ? (
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                  <img src={culture} alt="" className='w-12 h-auto object-contain' />
                  <div className='text-center'>
                    <p className='text-xl font-light text-slate-900'>Culture Activities</p>
                  </div>
                </div>
                ) :
                packagee.category === 'Wildlife' ? (
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                  <img src={wild} alt="" className='w-12 h-auto object-contain' />
                  <div className='text-center'>
                    <p className='text-xl font-light text-slate-900'>Wildlife Activities</p>
                  </div>
                </div>
                ):
                packagee.category === 'Adventure' ?(
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                  <img src={adventurer} alt="" className='w-12 h-auto object-contain' />
                  <div className='text-center'>
                    <p className='text-xl font-light text-slate-900'>Adventure Activities</p>
                  </div>
                </div>
                ):
                packagee.category === 'Pilgrimade' ?(
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                  <img src={namaste} alt="" className='w-12 h-auto object-contain' />
                  <div className='text-center'>
                    <p className='text-xl font-light text-slate-900'>Pilgrimade Activities</p>
                  </div>
                </div>
                ):''}
              </div>


              <div>
                {packagee.dining && (
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                  <img src={dining} alt="" className='w-12 h-auto object-contain' />
                  <div className='text-center'>
                    <p className='text-xl font-light text-slate-900'>Dining Options</p>
                    <p className='text-base text-slate-700'>Breakfast,Lunch & Dinner</p>
                  </div>
                </div>
                )}
              </div>

              <div>
                {packagee.transport && (
                  <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                  <img src={transport} alt="" className='w-12 h-auto object-contain' />
                  <div className='text-center'>
                    <p className='text-xl font-light text-slate-900'>Transportation</p>
                    <p className='text-base text-slate-700'>Private Car</p>
                  </div>
                </div>
                )}
              </div>


              
            </div>  
          </div>
          <div className='flex flex-col items-center justify-center mt-8 container mx-auto'>
            <div className='grid grid-cols-4 gap-x-4 gap-y-8'>
              <div>
                  {packagee.days && (
                    <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={days} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-3xl font-light text-slate-900'>{+packagee.days}</p>
                      <p className='text-xl text-slate-700'>Days</p>
                    </div>
                  </div>
                  )}
                </div>

                <div>
                  {packagee.itinerary && (
                    <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={transfers} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-3xl font-light text-slate-900'>{+packagee.itinerary}</p>
                      <p className='text-xl text-slate-700'>Transfers</p>
                    </div>
                  </div>
                  )}
                </div>

                <div>
                  {packagee.noofhotels && (
                    <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={hotels} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-3xl font-light text-slate-900'>{+packagee.noofhotels}</p>
                      <p className='text-xl text-slate-700'>Hotels</p>
                    </div>
                  </div>
                  )}
                </div>

                <div>
                  {packagee.noofactivities && (
                    <div className='flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg'>
                    <img src={activities} alt="" className='w-12 h-auto object-contain' />
                    <div className='text-center'>
                      <p className='text-3xl font-light text-slate-900'>{+packagee.noofactivities}</p>
                      <p className='text-xl text-slate-700'>Activities</p>
                    </div>
                  </div>
                  )}
                </div>
            </div>
          </div>
          <hr className='w-3/4 h-2 mx-auto my-4 bg-gray-100 border-0 rounded md:my-4 dark:bg-blue-950'/> 

          <div>
              {packagee.hoteltype && (
                <div>
                  <div className='flex flex-row  h-auto gap-4 mt-9 ml-9 mr-9 items-center justify-center'>
                  <img src={hotels} alt="" className='w-12 h-auto object-contain' />
                      <p className='text-xl font-light text-slate-700'>Accomodation Type: </p>                        
                  </div>
                  <p className='text-xl text-slate-900 m-7 mt-0 text-center justify-center'>{packagee.hoteltype}</p>
                </div>
                
                )}
            </div> 

            <div>
              {packagee.citys && (
                <div>
                  <div className='flex flex-row h-auto gap-4 mt-9 ml-9 mr-9 items-center justify-center'>
                  <img src={location} alt="" className='w-12 h-auto object-contain' />
                      <p className='text-xl font-light text-slate-700'>Locations: </p>                        
                  </div>
                  <p className='text-xl text-slate-900 m-7 mt-0 text-center justify-center'>{packagee.citys}</p>
                </div>
                
                )}
            </div> 

            <div>
              {packagee.specialactivities && (
                <div>
                  <div className='flex flex-row h-auto gap-4 mt-9 ml-9 mr-9 items-center justify-center'>
                  <img src={spactivity} alt="" className='w-12 h-auto object-contain' />
                      <p className='text-xl font-light text-slate-700 '>Activities: </p>                        
                  </div>
                  <p className='text-xl text-slate-900 text-center justify-center m-7 mt-0'>{packagee.specialactivities}</p>
                </div>
                
                )}
            </div> 

            <div>
              {packagee.description && (
                <div>
                  <div className='flex flex-row h-auto gap-4 mt-9 ml-9 mr-9 justify-center items-center'>
                    <img src={description} alt="" className='w-12 h-auto object-contain' />
                    <p className='text-xl font-light text-slate-900 '>Description: </p>                        
                  </div>
                  <p className='text-xl text-slate-700 m-7 mt-0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{packagee.description}</p>
                </div>
                
                )}
            </div>

            <div>
              {packagee.policy && (
                <div>
                  <div className='flex flex-row h-auto gap-4 mt-9 ml-9 mr-9 items-center justify-center'>
                  <img src={policy} alt="" className='w-12 h-auto object-contain' />
                      <p className='text-xl font-light text-slate-900 '>Policy: </p>                   
                  </div>
                  <p className='text-xl text-slate-700 m-7 mt-0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{packagee.policy}</p>  
                </div>
                
                )}
            </div> 
            <hr className='w-3/4 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-blue-950'/>
          </div>
          <div className='absolute top-0 right-0 mt-[550px] mr-[30px] w-[400px] h-auto  bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl'>
          <div>
                  {!packagee.offer ? (
                    <div>
                      <div className='flex flex-wrap justify-between gap-10 items-center m-4'>
                      <div>
                            <p className='font-extralight text-4xl text-blue-700'>{packagee.days} Days</p>
                      </div>
                      <div className='text-center'>
                            <p className='font-semibold text-5xl text-slate-800'>$ {packagee.price}</p>
                            {packagee.type === 'reguler' ? (<p>Per Person</p>) :
                            packagee.type === 'couple' ? (<p>Per two Person</p>):
                            packagee.type === 'family' ? (<p>Per two Person</p>):''}
                            
                      </div>  
                      </div>
                      <div className='text-center'>
                        <span>&#9733; Offers : <span className='text-slate-600'>No any Offers</span></span>
                      </div>
                    </div>
                  ):
                  (<div>
                      <div className=' grid grid-cols-2 justify-between gap-x-3 gap-y-3 items-center m-4'>
                      <div>
                            <p className='font-extralight text-4xl text-blue-700'>{packagee.days} Days</p>
                      </div>
                      <div className='text-center'>
                            <p className='font-semibold text-5xl text-slate-800'>$ {packagee.price}</p>
                            {packagee.type === 'reguler' ? (<p>Per Person</p>) :
                            packagee.type === 'couple' ? (<p>Per two Person</p>):
                            packagee.type === 'family' ? (<p>Per two Person</p>):''}
                            
                      </div>
                      <div className='mt-7'>
                            <p className='font-extralight text-base text-slate-600'>Reguler Price</p>
                      </div>
                      <div className='text-center mt-7'>
                            <p className='font-thin text-2xl text-slate-800'>$ {packagee.price}</p>
                      </div>
                      <div>
                            <p className='font-extralight text-base text-slate-600'>Offer</p>
                      </div>
                      <div className='text-center'>
                            <p className='font-thin text-2xl text-red-800'>$ {packagee.price - packagee.offerprice}</p>
                      </div>
                      <hr className='w-full h-2  bg-gray-100 border-0 rounded  dark:bg-blue-950'/> 
                      <hr className='w-full h-2  bg-gray-100 border-0 rounded  dark:bg-blue-950'/> 
                      <div>
                            <p className='font-extralight text-base text-slate-600'>Final Price</p>
                      </div>
                      <div className='text-center'>
                            <p className='font-semibold text-5xl text-slate-700'>$ {packagee.offerprice}</p>
                            {packagee.type === 'reguler' ? (<p>Per Person</p>) :
                            packagee.type === 'couple' ? (<p>Per two Person</p>):
                            packagee.type === 'family' ? (<p>Per two Person</p>):''}
                      </div>
                      
                      
                      </div>
                      <div className='text-center'>
                        <span>&#9733; <span className='text-red-600'>This offer valid for limited tme.</span>&#9733;</span>
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
                <button className='bg-sky-800 text-white rounded-lg uppercase hover:opacity-95 p-3 w-[400px]' onClick={()=>setContact(true)}>Contact for more details.</button>
              </div>
            )}
            {contact && <Contact packagee={packagee}/>}
          </div>

        </div>
        }
      </main>
    </div>
  )
}
