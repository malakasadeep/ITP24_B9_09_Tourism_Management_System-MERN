import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';

export default function Guides() {
  SwiperCore.use([Navigation]);

  const [guiding, setGuiding] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchGuiding = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/tour-guide/get/${params.guidingId}`);
        console.log(res)
        const data = await res.json();
        console.log(data)
        if (data.success === false) {
            (setError(true));
            setLoading(false);
            return;
          }else {
            // Data retrieval success
           (setGuiding(data));
           setLoading(false);
          }
       
      

      } catch (error) {
        // Handle network or unexpected errors
        console.error('Error parsing JSON:', jsonError);
        setError(true);
        setLoading(false);
      }
    };

    fetchGuiding();
  }, [params.guidingId]);

  return (
    <main>
         {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {guiding && !loading  && ! error &&(
        <div>
  <Swiper navigation>
  {guiding.images.map((url) => (
  <SwiperSlide key={url}>
<div className="flex justify-center items-center">
  
      <div className='h-[550px]' style={{background: 'center no-repeat', backgroundSize: 'cover',}}><img src={url} alt="Image" /></div>
</div>  
</SwiperSlide>


  ))}
  
</Swiper>
<div className='flex flex-col max-w-4xl mx-auto p-12 my-9 gap-4'>
<h1 className="font-bold text-5xl text-center underline">Guide Details</h1>
<p className='text-2xl font-semibold text-center'>Name: {guiding.name}</p>
<p className='text-2xl font-semibold text-center'>Address: {guiding.address}</p>
<p className='text-2xl font-semibold text-center'>Email: {guiding.email}</p>
<p className='text-2xl font-semibold text-center'>language: {guiding.language}</p>
<p className='text-2xl font-semibold text-center'>description: {guiding.description}</p>
<button className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>Book the Guide</button>

</div>
</div>
      )}
    </main>
  );
}
