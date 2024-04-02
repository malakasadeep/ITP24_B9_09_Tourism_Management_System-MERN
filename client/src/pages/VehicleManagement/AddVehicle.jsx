import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../../firebase';
import Swal from 'sweetalert2';
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/VehicleManagement/BackButton';

const AddVehicle = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
        imageUrls: [],
        ownername: '',
        brand: '',
        model:'',
        type: '',
	      regno: "",
	      seats: 0,
	      transmission: "",
        price:0,
	      description: "",
	      location: "",
      });
    const [fileUploadError, setFileUploadError] = useState(false);
    const [filePerc, setFilePerc] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const { description } = formData.description;
    const navigate = useNavigate();


  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
        setUploading(true);
        setFileUploadError(false);
        const promises = [];

        for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
        }
        Promise.all(promises).then((urls) => {
            setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
            setFileUploadError(false);
            setUploading(false);
        }).catch((err) => {
            setFileUploadError(Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Image upload failed (2MB max)",
              }));
              setUploading(false);
        });
    }else{
        setFileUploadError(Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You can upload max 3 images",
          }));
          setUploading(false);
    }
};

const storeImage = async (file) => {
    return new Promise( (resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage , `vehicleimages/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
                console.log('Upload is ' + progress + '% done');
            },
            (error)=>{
                reject(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
            );
    });
};

const handleremoveImage = (index) => {
    setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
};

const handleChange = (e) => {
  if (e.target.type === 'number' || e.target.type === 'text'||e.target.type === 'textarea' ){
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
            if (formData.imageUrls.length < 1) {
                setError('Please upload atleast one image');
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'Please upload atleast one image',
                })
                
                return;
            }
            const regex = /^[A-Z]{3}-\d{4}$|^\d{2}-\d{4}$|^[A-Z]{2}-\d{4}$|^\d{1}-\d{4}$/;
            if(!regex.test(formData.regno)){
                setError('Invalid vehicle number. Please enter a valid vehicle number.');
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'Invalid vehicle number. Please enter a valid vehicle number.'
                });
                return;
            }
            setLoading(true);
            setError(false);
            const res = await fetch('/api/vehicle/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: '123' //currentUser._id,
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
                    text: "Package added successfully",
                });
                navigate('/Vehicle');
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
          <main className='p-3 max-w-4xl mx-auto'>
            <BackButton/>
          <h1 className='text-3xl font-semibold text-center my-7 mt-24'>Add a New Vehicle</h1>
  
          <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-4 flex-1'>
              <label for className='lg:text-lg text-left'>Vehicle Owner's Name</label>
            <input type='text' className='border rounded-lg w-full p-2 mt-2' placeholder='Yasiru Deshan' id='ownername' onChange={handleChange} value={formData.ownername} required/>

            <label for className='lg:text-lg text-left'>Vehicle Brand Name</label>
            <input type='text' className='border rounded-lg w-full p-2 mt-2' placeholder='Honda' id='brand' onChange={handleChange} value={formData.brand} required/>

            <label for className='lg:text-lg text-left'>Vehicle Model</label>
            <input type='text' className='border rounded-lg w-full p-2 mt-2' placeholder='Civic' id='model' onChange={handleChange} value={formData.model} required/>

            <label for className='lg:text-lg text-left'>Vehicle Type</label>
            <select className='p-2 border rounded-md w-full bg-white mt-2' id='type' onChange={handleChange} value={formData.type} required>
            
            
            <option>Car</option>
            <option>SUV</option>
            <option>Van</option>
            <option>Motor Bike</option>
            <option>Tuk Tuk</option>
            <option>Bus</option>
          </select>

          <label for className='lg:text-lg text-left'>Vehicle Number</label>
          <input type='text' className='border rounded-lg w-full p-2  mt-2' placeholder='CAF-6458' id='regno' onChange={handleChange} value={formData.regno} required/>
          {error && <div className='text-[#ff2d2d] pb-4'>{error}</div>}

          <label for className='lg:text-lg text-left mt-6'>Number of Seats</label>
          <input type='number'  className='border rounded-lg w-full p-2' placeholder='04' id='seats' onChange={handleChange} value={formData.seats} required/>

          <label for className='lg:text-lg text-left'>Transmission Type</label>
          <select className='p-2 border rounded-md w-full bg-white mt-2' id='transmission' onChange={handleChange} value={formData.transmission} required>
            <option value='Auto'>Auto</option>
            <option value='Manual'>Manual</option>
          </select>


          <label for className='lg:text-lg text-left'>Fuel Type</label>
          <select className='p-2 border rounded-md w-full bg-white mt-2 ' id='fueltype' onChange={handleChange} value={formData.fueltype} required>
            
            
            <option value='Petrol'>Petrol</option>
            <option value='Diesel'>Diesel</option>
            <option value='Hybrid'>Hybrid</option>
            <option value='Electric'>Electric</option>
          </select>

          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Rent Price
              </label>
          <input type='number' className='border rounded-lg w-full p-2  mt-2' placeholder='12500' id='price' onChange={handleChange} value={formData.price} required/>

          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
          <textarea rows = '4' maxLength={299}  className='border rounded-lg w-full p-2  mt-2' placeholder='Add your description here' id='description' onChange={handleChange} value={formData.description} required/>
          

          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900"> Location </label>
          <input type='text' list='city' className='border rounded-lg w-full p-2 mt-2' placeholder='Colombo' id='location' onChange={handleChange} value={formData.location} required/>

          <datalist id='city'>
            
            <option value='Colombo'></option>
            <option value='Galle'></option>
            <option value='Kandy'></option>
            <option value='Jaffna'></option>
            <option value='Matara'></option>
            <option value='Negombo'></option>
          </datalist>

              </div>
              <div className='flex flex-col flex-1 gap-4'>
                  <p className='font-semibold'>Images:
                  <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 3)</span>
                  </p>
                  <div className='flex gap-4'>
                      <input onChange={(e) => setFiles(e.target.files)} type='file' className='p-3 border border-blue-700 rounded w-full' id='images' accept='image/*' multiple  />
                      <button type='button' onClick={handleImageSubmit} className='p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-xl disabled:opacity-80' disabled = {uploading} >{uploading ? 'Uploading...' : 'Upload'}</button>
                  </div>
                  <p className='text-sm self-center font-semibold'>
                      {fileUploadError ?
                          (<span className='text-red-700'>Error image upload</span>) :
                      filePerc > 0 && filePerc < 100 ? 
                          (<span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>) :
                      filePerc === 100 ? 
                          (<span className='text-green-700'>Image upload successfully!!</span>) :
                          ("")
                       }
                  </p>
                  {
                      formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                          <div key={url} className='flex justify-between p-3 border border-blue-700 items-center'>
                              <img src={url} alt="pkg images" className='w-24 h-24 object-contain rounded-lg' />
                              <button type='button' onClick={() => handleremoveImage(index)} className='text-red-700 text-5xl font-extrabold rounded-lg uppercase hover:opacity-60'><MdDeleteForever /></button>
                          </div>
                      ))
                  }
                  <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>{loading ? 'Loading' : 'Add the Vehicle'}</button>
                  {error && <p className='text-red-600'>{error}</p>}
              </div>
          </form>
      </main>
  );
}

export default AddVehicle;


