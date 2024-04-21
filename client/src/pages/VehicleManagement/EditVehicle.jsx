import React, { useEffect, useState } from 'react';
import BackButton from '../../components/VehicleManagement/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';

const EditVehicle = () => {
    const [ownername, setownername] = useState('');
    const [brand, setbrand] = useState('');
    const [model, setmodel] = useState('');
    const [type, settype] = useState('');
    const [seats, setseats] = useState('');
    const [regno, setregno] = useState('');
    const [price, setprice] = useState('');
    const [transmission, settransmission] = useState('');
    const [description, setdescription] = useState('');
    const [location, setlocation] = useState('');
    const [formData, setFormData] = useState({ imageUrls: [] });

    const [files, setFiles] = useState([]); // State for handling file inputs
    const [fileUploadError, setFileUploadError] = useState(null);
    const [filePerc, setFilePerc] = useState(0); // State for tracking upload progress
    const [uploading, setUploading] = useState(false);

    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/vehicle/get-vehi/${id}`)
            .then((res) => {
                setownername(res.data.ownername);
                setbrand(res.data.brand);
                setmodel(res.data.model);
                settype(res.data.type);
                setregno(res.data.regno);
                setseats(res.data.seats);
                settransmission(res.data.transmission);
                setprice(res.data.price);
                setdescription(res.data.description);
                setlocation(res.data.location);
                setFormData({ ...formData, imageUrls: res.data.imageUrls || [] }); // Initialize image URLs
            });
    }, []);

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        const data = {
            ownername,
            brand,
            model,
            type,
            regno,
            seats,
            transmission,
            price,
            description,
            location,
            imageUrls: formData.imageUrls, // Include image URLs in the data
        };

        setloading(true);
        axios.put(`/api/vehicle/update/${id}`, data)
            .then(() => {
                setloading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Your Vehicle updated Successfully',
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate('/Vehicle');
            })
            .catch((error) => {
                setloading(false);
                enqueueSnackbar('Vehicle Updating Failed', { variant: 'error' });
                alert(error.message);
                console.error(error);
            });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleImageSubmit = async () => {
        if (files.length === 0) {
            return;
        }

        setUploading(true);
        setFileUploadError(null);

        // Initialize an array to store uploaded image URLs
        const uploadedImageUrls = [];

        // Loop through each file and upload
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('image', files[i]);

            try {
                const response = await axios.post('/api/upload-image-endpoint', formData, {
                    onUploadProgress: (progressEvent) => {
                        const progress = (progressEvent.loaded / progressEvent.total) * 100;
                        setFilePerc(Math.round(progress));
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Assuming the image URL is returned in the response data
                uploadedImageUrls.push(response.data.imageUrl);
            } catch (error) {
                setFileUploadError('Error uploading image');
                console.error('Image upload error:', error);
            }
        }

        // Update the imageUrls state after uploading is complete
        setFormData((prevData) => ({
            ...prevData,
            imageUrls: [...prevData.imageUrls, ...uploadedImageUrls],
        }));

        setUploading(false);
    };

    const handleRemoveImage = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            imageUrls: prevData.imageUrls.filter((_, i) => i !== index),
        }));
    };

    return (
        <div>
            <div>EditVehicle</div>
            <div className='p-4'>
                <BackButton />
                <h1 className='text-3xl font-bold'>Edit Vehicle</h1>
                <form className='flex flex-col sm:flex-col gap-4' onSubmit={handleUpdateSubmit}>
                    {/* Existing form fields for updating vehicle details */}
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='ownername'>
                            Owner Name
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='ownername'
                            type='text'
                            placeholder='Owner Name'
                            defaultValue={ownername}
                            onChange={(e) => setownername(e.target.value)}
                        />
                    </div>

                    {/* Other form fields (brand, model, type, regno, price, etc.) */}
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='brand'>
                            Brand
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='brand'
                            type='text'
                            placeholder='Brand'
                            defaultValue={brand}
                            onChange={(e) => setbrand(e.target.value)}
                        />
                    </div>
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='model'>
                            Model
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='model'
                            type='text'
                            placeholder='Model'
                            defaultValue={model}
                            onChange={(e) => setmodel(e.target.value)}
                        />
                    </div>
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='type'>
                            Type
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='type'
                            type='text'
                            placeholder='Type'
                            defaultValue={type}
                            onChange={(e) => settype(e.target.value)}
                        />
                    </div>
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='regno'>
                            Registration Number
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='regno'
                            type='text'
                            placeholder='Registration Number'
                            defaultValue={regno}
                            onChange={(e) => setregno(e.target.value)}
                        />
                    </div>
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                            Price
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='price'
                            type='number'
                            placeholder='Price'
                            defaultValue={price}
                            onChange={(e) => setprice(e.target.value)}
                        />
                    </div>
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                            Description
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='description'
                            type='text'
                            placeholder='Description'
                            defaultValue={description}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                    </div>
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='location'>
                            Location
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='location'
                            type='text'
                            placeholder='Location'
                            defaultValue={location}
                            onChange={(e) => setlocation(e.target.value)}
                        />
                    </div>
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='seats'>
                            Seats
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='seats'
                            type='number'
                            placeholder='Seats'
                            defaultValue={seats}
                            onChange={(e) => setseats(e.target.value)}
                        />
                    </div>
                    <div className='my-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='transmission'>
                            Transmission
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='transmission'
                            type='text'
                            placeholder='Transmission'
                            defaultValue={transmission}
                            onChange={(e) => settransmission(e.target.value)}
                        />
                    </div>
                    
                    {/* Image uploading section */}
                    <div className='flex flex-col flex-1 gap-4'>
                        <p className='font-semibold'>Images:
                            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 3)</span>
                        </p>
                        <div className='flex gap-4'>
                            <input
                                onChange={handleFileChange}
                                type='file'
                                className='p-3 border border-blue-700 rounded w-full'
                                id='images'
                                accept='image/*'
                                multiple
                            />
                            <button
                                type='button'
                                onClick={handleImageSubmit}
                                className='p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-xl disabled:opacity-80'
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                        <p className='text-sm self-center font-semibold'>
                            {fileUploadError ? (
                                <span className='text-red-700'>Error uploading image</span>
                            ) : filePerc > 0 && filePerc < 100 ? (
                                <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                            ) : filePerc === 100 ? (
                                <span className='text-green-700'>Image uploaded successfully!</span>
                            ) : ("")}
                        </p>

                        {/* Display uploaded images */}
                        {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div key={url} className='flex justify-between p-3 border border-blue-700 items-center'>
                                <img src={url} alt='Uploaded image' className='w-24 h-24 object-contain rounded-lg' />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='text-red-700 text-5xl font-extrabold rounded-lg uppercase hover:opacity-60'
                                >
                                    &#x1F5D1;
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Submit button */}
                    <div className='my-4'>
                        <button
                            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold text-2xl hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-3/4 ml-12 mb-4'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVehicle;
