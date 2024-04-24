import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CreateTrain() {

    const [formData, setFormData] = useState({
        trainName:'',
        category:'',
        class:'1st',
        from:'',
        departureTime:'',
        destination:'',
        arrivalTime:'',
        type:'daily',
        noofseats:'1',
        price:'1',
        description:''
    })
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.id === '1st' || e.target.id === '2nd' || e.target.id === '3rd') {
            setFormData({
                ...formData,
                class: e.target.id,
            });
        } if (e.target.id === 'daily' || e.target.id === 'wd' || e.target.id === 'we') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        } if (e.target.type === 'number' || e.target.type === 'text'||e.target.type === 'textarea'||e.target.type === 'time'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        } if (e.target.type === 'select-one'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }

        
        
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.destination === formData.from){
                setError('Start and destination stations are same');
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'Start and destination stations are same'
                });
                return;
            }
            if(formData.noofseats > 0 && formData.price > 0){
                setError('Seats or prices are not valid');
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'Seats or prices are not valid'
                });
                return;
            }
            setLoading(true);
            setError(false);
            const res = await fetch('/api/train/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `${data.message}`,
                })
            }else{
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Train added successfully",
                });
                navigate('/admin/train');
            }
        } catch (error) {
            setError(error.message);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${error.message}`,
            })
            setLoading(false);
        }
    }
  return (
    <div>
        <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7 mt-24'>Schedule a new train</h1>

        <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Train Name' className='border p-3 rounded-lg' id='trainName' required onChange={handleChange} value={formData.trainName}/>
                <select className='border p-3 rounded-lg' name='category' id='category' required onChange={handleChange} value={formData.category} >
                    <option className='text-slate-400' hidden >Type</option>
                    <option value="Express">Express</option>
                    <option value="Intercity">Intercity</option>
                    <option value="Slow">Slow</option>
                </select>
                <div className='flex items-center gap-2'>
                        <input type='number' id='price' min='1' className='p-3 border border-blue-300 rounded-lg' required onChange={handleChange} value={formData.price} />
                        <p>Ticket Price</p>
                </div>
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='1st' className='w-5' onChange={handleChange} checked={formData.class === '1st'}/>
                        <span>1st Class</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='2nd' className='w-5' onChange={handleChange} checked={formData.class === '2nd'} />
                        <span>2nd Class</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='3rd' className='w-5' onChange={handleChange} checked={formData.class === '3rd'} />
                        <span>3rd Class</span>
                    </div>
                    
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <select  id='from' name='from' className='p-3 border border-blue-300 rounded-lg w-60' required onChange={handleChange} value={formData.from}>
                                <option value='Colombo Fort'>Colombo Fort </option>
                                <option value = 'Galle'>Galle</option>
                                <option value = 'Matara'>Matara</option>
                                <option value = 'Badulla'>Badulla</option>
                                <option value = 'Hatton'>Hatton</option>
                                <option value = 'Batticaloa'>Batticaloa</option>
                                <option value = 'Vavuniya'>Vavuniya</option>
                        </select> 
                        <p>Start Station</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='time' id='departureTime' className='p-3 border border-blue-300 rounded-lg' required onChange={handleChange} value={formData.departureTime} />
                        <p>Departure Time</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <select type='text' id='destination' className='p-3 border border-blue-300 rounded-lg w-60' required onChange={handleChange} value={formData.destination} >
                            <option value='Colombo Fort'>Colombo Fort </option>
                            <option value = 'Galle'>Galle</option>
                            <option value = 'Matara'>Matara</option>
                            <option value = 'Badulla'>Badulla</option>
                            <option value = 'Hatton'>Hatton</option>
                            <option value = 'Batticaloa'>Batticaloa</option>
                            <option value = 'Vavuniya'>Vavuniya</option>
                        </select>
                        <p>Destination</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='time' id='arrivalTime'  className='p-3 border border-blue-300 rounded-lg' required onChange={handleChange} value={formData.arrivalTime}/>
                        <p>Arrival Time</p>
                    </div>

                    <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2 '>
                        <input type='checkbox' id='daily' className='w-5' onChange={handleChange} checked={formData.type === 'daily'}/>
                        <span className='mt-3'>Daily</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='wd' className='w-5' onChange={handleChange} checked={formData.type === 'wd'} />
                        <span className='mt-3'>Week Days Only</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='we' className='w-5' onChange={handleChange} checked={formData.type === 'we'} />
                        <span className='mt-3'>Weekend only</span>
                    </div>
                    
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='noofseats' min='1' className='p-3 border border-blue-300 rounded-lg' required onChange={handleChange} value={formData.noofseats}/>
                        <div className='flex flex-col items-center'>
                            <p>No of Seats</p>
                        </div>
                    </div>
                    
                </div>
                <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description'  required onChange={handleChange} value={formData.description} /> 
                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>{loading ? 'Loading' : 'Add the Train'}</button>
                <Link className='p-3 bg-red-700 text-white text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Cancel</Link>
                {error && <p className='text-red-600'>{error}</p>}   
            </div>
                
        </form>
    </main>
    </div>
  )
}
