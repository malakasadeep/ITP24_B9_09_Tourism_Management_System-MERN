import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../../firebase";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateHotel() {
  const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        name:'',
        roomtype: '',
        type: 'reguler',
        city: '',
	      province: '',
	      zip: '',
        address: '',
	      distance: '',
	      description: '',
	      contactName: '',
	      contactNo: '',
        availableWork:'',
	      numberOfRoom: '',
	      price: "",
	      hotelImgs: [],
	    
    });
    const [fileUploadError, setFileUploadError] = useState(false);
    const [filePerc, setFilePerc] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const params = useParams();
  
    useEffect(() => {
      const fetchHotel = async () => {
        const hotelId = params.hotelId;
        const res = await fetch(`/api/hotel/get-update/${hotelId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setFormData(data);
        console.log(hotelId);
      };
      fetchHotel();
    }, []);
  
    console.log(formData);
    const handleImageSubmit = (e) => {
      if (files.length > 0 && files.length + formData.hotelImgs.length < 7) {
          setUploading(true);
          setFileUploadError(false);
          const promises = [];

          for (let i = 0; i < files.length; i++) {
              promises.push(storeImage(files[i]));
          }
          Promise.all(promises).then((urls) => {
              setFormData({ ...formData, hotelImgs: formData.hotelImgs.concat(urls) });
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
              text: "You can upload max 5 images",
            }));
            setUploading(false);
      }
  };

  const storeImage = async (file) => {
      return new Promise( (resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage , `packageImages/${fileName}`);
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
          hotelImgs: formData.hotelImgs.filter((_, i) => i !== index),
      })
  };
  const handleChange = (e) => {
    if (
      e.target.id === "3 Stars hotel" ||
      e.target.id === "4 Stars hotel" ||
      e.target.id === "5 Stars hotel"
    ) {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (e.target.id === 'available'||e.target.id === 'not available' ) {
      setFormData({
          ...formData,
          availableWork: e.target.id,
      });
      
    
  } 
  if (e.target.id === 'Single room' || e.target.id === 'Double room' || e.target.id === 'All') {
    let roomtype;
    if (e.target.id === 'All') {
        roomtype = ['Single room', 'Double room'];
    } else {
        roomtype = e.target.id;
    }

    setFormData({
        ...formData,
        roomtype: roomtype,
    });
}
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
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (formData.hotelImgs.length < 1) {
      setError("Please upload atleast one image");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please upload atleast one image",
      });
      return;
    }
    if (+formData.price < +formData.offerprice) {
      setError("Discount price must be lower than the regular price");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Discount price must be lower than the regular price",
      });
      return;
    }
    setLoading(true);
    setError(false);
    const res = await fetch(`/api/hotel/update/${params.hotelId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        userRef: formData.userRef,
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
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Package Updated successfully",
      });
      if (currentUser.isadmin) {
        navigate(`/admin/hotels`);
      } else {
        navigate(`/my-hotels/${data._id}`);
      }
    }
  } catch (error) {
    setError(error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `${error.message}`,
    });
    setLoading(false);
  }
};
  }

  return (
    <div className="flex justify-center" >
 
          <form
            className="w-full max-w-lg"
         
            encType="multipart/form-data"onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold mb-8 mt-8">
              Update Your <span className="text-[#41A4FF]">Hotel</span> and{" "}
              <span className="text-[#41A4FF]">Join</span> with us
            </h1>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Hotel name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  placeholder="Enter your Hotel name"
                  required
                   onChange={handleChange} value={formData.name}
                   
                />
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full  px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Title
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="title"
                  type="text"
                  placeholder="Enter title for your Hotel"
                  required onChange={handleChange} value={formData.title}
                
                />
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  for="HotelType"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Select your Hotel Type
                </label>
                <select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required onChange={handleChange} value={formData.type}
                >
                  <option>--Add hotel type</option>
                  <option>3 Stars hotel</option>
                  <option>4 Stars hotel</option>
                  <option>5 Stars hotel</option>
                 
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  for="Availablility"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Availablility
                </label>
                <select
                  id="availableWork"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required onChange={handleChange} value={formData.availableWork}
                >
                  <option>--Availablility--</option>
                  <option>available</option>
                  <option>not available</option>
                  
                 
                </select>
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="city"
                  type="text"
                  required onChange={handleChange} value={formData.city}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Province
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="province"
                    required onChange={handleChange} value={formData.province}
                    
                  >
                    <option>SOUTHERN PROVINCE</option>
                    <option>WESTERN PROVINCE</option>
                    <option>CENTRAL PROVINCE</option>
                    <option>SABARAGAMUWA PROVINCE</option>
                    <option>EASTERN PROVINCE</option>
                    <option>UVA PROVINCE</option>
                    <option>NORTH WESTERN PROVINCE</option>
                    <option>NORTH CENTRAL PROVINCE</option>
                    <option>NORTHERN PROVINCE</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-zip"
                >
                  Zip
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="zip"
                  type="text"
                  placeholder="90210"
                  required onChange={handleChange} value={formData.zip}
                />
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="address"
                  type="text"
                  required onChange={handleChange} value={formData.address}
                 
                />
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Distance from main city
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="distance"
                  type="text"
                  required onChange={handleChange} value={formData.distance}
                 
                />
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Contact Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="contactName"
                  type="text"
                  required onChange={handleChange} value={formData.contactName}
                  
                />
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Contact Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="contactNo"
                  type="int"
                  required onChange={handleChange} value={formData.contactNo}
                
                />
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  NUmber of room 
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 borderrounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="numberOfRoom"
                  type="number"
                  required onChange={handleChange} value={formData.numberOfRoom}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  for="roomtype"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Room Type
                </label>
                <select
                  id="roomtype"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required onChange={handleChange} value={formData.roomtype}
                >
                  <option>--Room Type--</option>
                  <option>All</option>
                  <option>Single Room</option>
                  <option>Double Room</option>
                  
                 
                </select>
              </div>
            </div>

    
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="description"
                  type="String"
                  required onChange={handleChange} value={formData.description}
                />
              </div>
            </div>
    
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  cheapest price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="price"
                  type="Number"
                  required onChange={handleChange} value={formData.price}
                 
                />
              </div>
            </div>
    
        
    
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
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
                    formData.hotelImgs.length > 0 && formData.hotelImgs.map((url, index) => (
                        <div key={url} className='flex justify-between p-3 border border-blue-700 items-center'>
                            <img src={url} alt="pkg images" className='w-24 h-24 object-contain rounded-lg' />
                            <button type='button' onClick={() => handleremoveImage(index)} className='text-red-700 text-5xl font-extrabold rounded-lg uppercase hover:opacity-60'><MdDeleteForever /></button>
                        </div>
                    ))
                }
            </div>
    
            <button className='p-3 bg-blue-400 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>{loading ? 'Loading' : 'Add the Hotel'}</button>
                {error && <p className='text-red-600'>{error}</p>}
          </form>
        </div>
      );
}