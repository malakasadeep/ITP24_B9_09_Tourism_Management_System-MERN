import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react'

export const SearchEvent = () => {

    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        searchTerm:'',
        type:'all',
        Event: false,
        Activity: false,
        participants:0,
        sort:'created_at',
        order: 'desc',
    });

    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect (() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('searchTerm') || '';
        const type = urlParams.get('type') || 'all';
        const offer = urlParams.get('Event') || false;
        const dining = urlParams.get('Activity') || false;
        const days = urlParams.get('Participants') || 0;
        const sort = urlParams.get('sort') || 'created_at';
        const order = urlParams.get('order') || 'desc';
        setSearchData({searchTerm, type, Event, Activity, participants, sort, order});

        const fetchEvent = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/Event/search/get?${searchQuery}`);
            const data = await res.json();
            setEvents(data);
            setLoading(false);
        }
        fetchEvent();
        
    }, [location.search]
    )

    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'Event' || e.target.id === 'Activity' ){
            setSearchData({...searchData, type: e.target.id});
        }

        if(e.target.id === 'Participants'){
            setSearchData({...searchData, days: e.target.value});
        }

        if(e.target.id === 'searchTerm'){
            setSearchData({...searchData, searchTerm: e.target.value});
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
        urlParame.set('Event', searchData.Event)
        urlParame.set('Activity', searchData.Activity)
        urlParame.set('Participants', searchData.participants)
        urlParame.set('sort', searchData.sort)
        urlParame.set('order', searchData.order)
        const searchQuery = urlParame.toString();
        navigate(`/events/search/:id?${searchQuery}`)
    };

  return (
    <>
    <div className='flex flex-col md:flex-row mt-16'>
        <div className='p-7 border-b-2  md:border-r-2  border-white md:min-h-screen'>
            <form onSubmit={handleSubmit} className=' flex flex-col gap-8'>
                <div cla ssName='flex items-center gap-2'>
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
                        <input type="checkbox"  id="reguler" className='w-5' onChange={handleChange} checked={searchData.type === 'Event'}/>
                        <span>Event</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox"  id="couple" className='w-5' onChange={handleChange} checked={searchData.type === 'Activity'}/>
                        <span>Activity</span>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'> No of Participants:</label>
                    <input type="number" id='days' placeholder='Participants' className='border rounded-lg p-3 w-full'value={searchData.participants} onChange={handleChange} />
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
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Event results:</h1>
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