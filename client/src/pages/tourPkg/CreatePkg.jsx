import React from 'react'

export default function CreatePkg() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7 mt-24'>Create a New Package</h1>

        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Package Title' className='border p-3 rounded-lg' id='name' maxLength= '62' minLength='10' required />
                <select className='border p-3 rounded-lg' name='category' id='category' required>
                    <option className='text-slate-400' hidden >Category</option>
                    <option value="Culture">Culture</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Pilgrimade">Pilgrimade</option>
                </select>

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='reguler' className='w-5' />
                        <span>Reguler</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='couple' className='w-5' />
                        <span>Couple</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='family' className='w-5' />
                        <span>Family</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='dining' className='w-5' />
                        <span>Dining Options</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='transport' className='w-5' />
                        <span>Transports</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='days' min='1' max='20' className='p-3  border-blue-300 rounded-lg' required />
                        <p>Days</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='itinerary' min='1' max='10' className='p-3 border-blue-300 rounded-lg' required />
                        <p>Transfers</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='noofhotels' min='1' max='20' className='p-3 border-blue-300 rounded-lg' required />
                        <p>Hotels</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='noofactivities' min='1' max='15' className='p-3 border-blue-300 rounded-lg' required />
                        <p>Activities</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='price' min='1' className='p-3 border-blue-300 rounded-lg' required />
                        <p>Reguler Price</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='offerprice' min='1' className='p-3 border-blue-300 rounded-lg' required />
                        <p>Discounted Price</p>
                    </div>
                </div>
                <input type='text' placeholder='Cities' className='border p-3 rounded-lg' id='citys' required />
                <p>Type of Hotel</p>
                <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='3' className='w-5' />
                        <span className='text-2xl'> &#9733; &#9733; &#9733;</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='4' className='w-5' />
                        <span className='text-2xl'> &#9733; &#9733; &#9733; &#9733;</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='5' className='w-5' />
                        <span className='text-2xl'> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                    </div>
                </div>
                <input type='text' placeholder='Special Activity' className='border p-3 rounded-lg' id='specialactivities'  required />
                <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description'  required />
                <textarea type='text' placeholder='Policies' className='border p-3 rounded-lg' id='policy'  required />
                
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input type='file' className='p-3 border border-blue-700 rounded w-full' id='images' accept='image/*' multiple required />
                    <button className='p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-xl disabled:opacity-80'>Upload</button>
                </div>
                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>List the Package</button>
            </div>
        </form>
    </main>
  )
}
