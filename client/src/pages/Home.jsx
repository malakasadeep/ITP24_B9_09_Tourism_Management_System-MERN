import React, { useEffect, useState } from 'react'
import PackageCard from '../components/tour-packages/PackageCard';
import { Link } from 'react-router-dom';
import'./../assets/css/Home.css';

export default function Home() {

  const [packages, setPackages] = useState([]);
  
  useEffect(() => {
    const fetchPkg = async () => {
      try {
        const res = await fetch('/api/Package/getpkgs?limit=3');
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.log(error);
      } 
    }
    fetchPkg();   
  }, [])

  return (
    
   // <div style={{ height: '100%',  backgroundSize: "cover",backgroundPosition: "center", backgroundRepeat: "no-repeat*/"}}>
    //  <h1 className='text-3xl'>Home</h1>
    <div>
      <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> 
      <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> 
      <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> 
      <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> 
      <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> <hr></hr> 
      
<div id="parallax-world-of-ugg">
  
  <section>
    <div class="title">
      <h3>Let's do some</h3>
      <h1>TravalCraft</h1>
    </div>
  </section>
  
  <section>
      <div class="parallax-one">
        <h2>EXPLORE SRI LANKA</h2>
      </div>
  </section>
  
  <section>
    <div class="block">
      <p><span class="first-character sc">T</span>he "TourCraft” is the one of the leading pioneers of providing innovative technology solutions for 
the tourism industry. With over a decade of experience, we have been at the forefront of 
designing modern software applications that assist tour operators, tour agencies.
Our proposed web-application " TourCraft " allows travelers to connect with each other, make 
their travel journey in a pleasurable manner.
They can easily collaborate with our staff members been declining since the company 
advertisements have no or less exposure to the online digital market tendency.
Moreover, current social media applications are not specialized for travelling purposes. To 
address this adverse impact, this user-centric software application supports travel specific 
functions such as: travel planning, finding users interested in same travel destination spots, 
sharing real travel experiences etc</p>
     
    </div>
  </section>
  

  
  <section>
  <div class="parallax-three">
    <h2>ENCHANTED FOREST</h2>
  </div>
</section>

<section>
  <div class="block">
    <p><span class="first-character atw">W</span>hen the New York fashion community notices your brand, the world soon follows. The widespread love for UGG extended to Europe in the mid-2000's along with the stylish casual movement and demand for premium casual fashion. UGG boots and shoes were now seen walking the streets of London, Paris and Amsterdam with regularity. To meet the rising demand from new fans, UGG opened flagship stores in the UK and an additional location in Moscow. As the love spread farther East, concept stores were opened in Beijing, Shanghai and Tokyo. UGG Australia is now an international brand that is loved by all. This love is a result of a magical combination of the amazing functional benefits of sheepskin and the heightened emotional feeling you get when you slip them on your feet. In short, you just feel better all over when you wear UGG boots, slippers, and shoes.</p>
    <p class="line-break margin-top-10"></p>
  
  </div>
</section>
  
  
  </div>
      <div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {packages && packages.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Packages</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/package-search'}>Show more Packages</Link>
            </div>
        
            <div className='flex flex-wrap gap-10'>
              {packages.map((pkg) => (
                <PackageCard pkg={pkg} key={pkg._id} />
              ))}
            </div>
            </div>
        
        )}
        </div>
      </div>
    </div>
  )
}
