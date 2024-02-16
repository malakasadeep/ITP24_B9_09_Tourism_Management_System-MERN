import React, { useEffect, useState } from 'react'
import PackageCard from '../components/tour-packages/PackageCard';
import { Link } from 'react-router-dom';

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
    
    <div style={{ height: '100%',  backgroundSize: "cover",backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
      <h1 className='text-3xl'>Home</h1>

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
