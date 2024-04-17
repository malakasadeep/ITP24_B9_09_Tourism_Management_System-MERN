import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HotelCard from '../../components/hotel/HotelCard';
import loadingimg from '../../assets/img/loading.gif'

export default function SearchHotel() {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        searchTerm:'',
        type:'all',
        availableWork: '',
        province:'',
        city:'',
        sort:'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    
    useEffect (() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('searchTerm') || '';
        const type = urlParams.get('type') || 'all';
        const availableWork = urlParams.get('availableWork') || '';
        const province = urlParams.get('province') || '';
        const city = urlParams.get('city') || '';
        const sort = urlParams.get('sort') || 'created_at';
        const order = urlParams.get('order') || 'desc';
        setSearchData({searchTerm, type, availableWork,province, city, sort, order});

        const fetchhotel = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/Hotel/gethotels?${searchQuery}`);
            const data = await res.json();
            setPackages(data);
            setLoading(false);
        }
        fetchhotel();
        
    }, [location.search]
    )
    
    const handleChange = (e) => {
 
        if(e.target.id === 'all'||e.target.id === '3 Star Hotel'  || e.target.id === '4 Star Hotel' || e.target.id === '5 Star Hotel'){
            setSearchData({...searchData, type: e.target.id});
        }
        if(e.target.id === 'available'||e.target.id === 'not available' ){
            setSearchData({...searchData, availableWork: e.target.id});
        }
        
        if(e.target.id === 'searchTerm'){
            setSearchData({...searchData, searchTerm: e.target.value});
        }
        if(e.target.id === 'province'){
            setSearchData({...searchData, province: e.target.value});
        }
        if(e.target.id === 'city'){
            setSearchData({...searchData, city: e.target.value});
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSearchData({...searchData, sort, order});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParame = new URLSearchParams()
        urlParame.set('searchTerm', searchData.searchTerm)
        urlParame.set('type', searchData.type)
        urlParame.set('availableWork', searchData.availableWork)
        urlParame.set('province', searchData.province)
        urlParame.set('city', searchData.city)
        urlParame.set('sort', searchData.sort)
        urlParame.set('order', searchData.order)
        const searchQuery = urlParame.toString();
        navigate(`/hotel-search?${searchQuery}`)
    };
  return (
    <>
    <div className='flex flex-col md:flex-row mt-16'>
        <div className='p-7 border-b-2  md:border-r-2  border-white md:min-h-screen'>
            <form onSubmit={handleSubmit} className=' flex flex-col gap-8 mt-16'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'> Search Term:</label>
                    <input type="text" id='searchTerm' placeholder='Search....' className='border rounded-lg p-3 w-full' value={searchData.searchTerm} onChange={handleChange}/>
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    <label htmlFor="" className='font-semibold'>Type: </label>
                    <div className='flex gap-2'>
                        <input type="checkbox"  id="all" className='w-5' onChange={handleChange} checked={searchData.type === 'all'} />
                        <span>All</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox"  id="3 Star Hotel" className='w-5' onChange={handleChange} checked={searchData.type === '3 Star Hotel'}/>
                        <span>3 Star Hotel</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox"  id="4 Star Hotel" className='w-5' onChange={handleChange} checked={searchData.type === '4 Star Hotel'}/>
                        <span>4 Star Hotel</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox"  id="5 Star Hotel" className='w-5' onChange={handleChange} checked={searchData.type === '5 Star Hotel'} />
                        <span>5 Star Hotel</span>
                    </div>
                </div>
              
                <div className='flex gap-2 flex-wrap items-center'>
                    <label htmlFor="" className='font-semibold'>Accomedation:</label>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="available" className='w-5' onChange={handleChange} checked={searchData.availableWork === 'available'}/>
                        <span>&#9733;&#9733;&#9733;</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="not available" className='w-5' onChange={handleChange} checked={searchData.availableWork === 'not available'}/>
                        <span>&#9733;&#9733;&#9733;&#9733;</span>
                    </div>
                    
                </div>
                
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Sort:</label>
                    <select id='sort_order' className='border rounded-lg p-3' onChange={handleChange} defaultValue={'created_at_desc'}>
                        <option value='price_desc'>Price high to low</option>
                        <option value='price_asc'>Price low to hight</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className='bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded w-3/4 ml-12 mb-4'>Search</button>
            </form>
            
        </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Package results:</h1>
                <div className='p-7 flex flex-wrap gap-2'>
                    {!loading && packages.length === 0 && <p className='text-2xl text-center p-5 text-blue-950'>No package found</p>}
                    {loading && (
                        <div className='flex flex-col items-center justify-center'>
                            <img src={loadingimg} alt="loading" className='w-28'/><p className='text-lg w-full text-center'>Loading....</p>
                        </div>
                        
                    )}
                    {!loading && packages &&
                    packages.map((pkg) => (
                        <PackageCard key={pkg._id} pkg={pkg}/>
                    ))}
                </div>
            </div>
    </div>
    </>
  )
}
