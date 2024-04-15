import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react'

export const SearchEvent = () => {
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