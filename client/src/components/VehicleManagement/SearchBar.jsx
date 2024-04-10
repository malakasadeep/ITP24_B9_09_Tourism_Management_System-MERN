import React, {useState, useEffect} from 'react';
import { FaCar } from "react-icons/fa"; // Import the specific icon from react-icons
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const today = new Date().toISOString().slice(0, 10);  

    const [vehicleType, setVehicleType] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [pickupDate, setPickupDate] = useState(today);
    const [returnDate, setReturnDate] = useState(today);

    const url =
        pickupLocation && vehicleType === "" ? `vehicle/location/get/${pickupLocation}`  
        : pickupLocation && vehicleType ? `vehicle/get/${vehicleType}/${pickupLocation}` 
        : vehicleType === "" ? "vehicle/"  
        : `vehicle/type/get/${vehicleType}`; 

    const { data } = useFetch(url);
    console.log(data)

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            navigate('/vehicles', {state: data});
        }
    }, [data, navigate]);

    return (
        <div className='bg-white mt-4 lg:mt-[-52px] px-8 shadow-lg max-w-[750px] p-4 lg:text-left text-center h-full items-center mx-auto rounded-lg'>
            <form className='flex flex-col lg:flex-row justify-between px-4'>
                <div className='flex flex-col'>
                    <label htmlFor='vehicleType' className='py-3'>Vehicle Type</label>
                    <select className='p-3 border rounded-md w-full' value={vehicleType} onChange={(e) => setVehicleType(e.target.value) }> 
                        <option value=''>All</option>
                        <option>E-Vehicles</option>
                        <option>Car</option>
                        <option>SUV</option>
                        <option>Van</option>
                        <option>Motor Bike</option>
                        <option>Tuk Tuk</option>
                        <option>Bus</option>
                    </select>
                </div>

                <div className='flex flex-col pl-16'>
                    <label htmlFor='pickupLocation' className='py-3'>Pick-up Location</label>
                    <input type='text' list='city' className='border rounded-md p-3 lg:w-[300px] w-full' placeholder='Colombo' value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value) }></input>
                    <datalist id='city'>
                        <option value='Colombo'/>
                        <option value='Galle'/>
                        <option value='Matara'/>
                        <option value='Mount Lavinia'/>
                        <option value='Kandy'/>
                        <option value='Katunayake Airport'/>
                        <option value='Negombo'/>
                    </datalist>
                </div>
                {/* Other form elements */}
            </form>
            <button className='bg-[#989999] text-white rounded-md font-medium py-3 w-full'>Search</button>
        </div>
    );
}

export default Searchbar;
