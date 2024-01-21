import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Packages() {

    SwiperCore.use([Navigation]);
    const [packagee, setPackagee] = useState(null)
    const [ loading , setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const params = useParams();

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
      <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong!!</p>}
        {packagee && !loading && !error && 
        <>
          <Swiper navigation>
            {packagee.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className='h-[450px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>
              </SwiperSlide>
            ))

            }
          </Swiper>
        </>
        }
      </main>
    </div>
  )
}
