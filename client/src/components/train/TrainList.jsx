import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/user/userList.css'

import { FcInfo } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import Swal from 'sweetalert2';

export const TrainList = () => {

    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        searchTerm:'',
        type:'all',
        from:'all',
        destination:'all',
        sort:'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [trains, setTrains] = useState([]);

    useEffect (() => {
      const urlParams = new URLSearchParams(window.location.search);
      const searchTerm = urlParams.get('searchTerm') || '';
      const type = urlParams.get('type') || 'all';
      const from = urlParams.get('from') || 'all';
      const destination = urlParams.get('destination') || 'all';
      const sort = urlParams.get('sort') || 'created_at';
      const order = urlParams.get('order') || 'desc';
      setSearchData({searchTerm, type, from, destination, sort, order});

      const fetchTrains = async () => {
          setLoading(true);
          const searchQuery = urlParams.toString();
          const res = await fetch(`/api/train/search?${searchQuery}`);
          const data = await res.json();
          setTrains(data);
          setLoading(false);
      }
      fetchTrains();
      
  }, [location.search]
  )
  const handleChange = (e) => {
    if(e.target.id === 'all' || e.target.id === 'Colombo Fort' || e.target.id === 'Galle' || e.target.id === 'Matara' || e.target.id === 'Badulla' || e.target.id === 'Hatton' || e.target.id === 'Batticaloa' || e.target.id === 'Vavuniya'){
      setSearchData({...searchData, from: e.target.id});
    }
    if(e.target.id === 'all' || e.target.id === 'Colombo Fort' || e.target.id === 'Galle' || e.target.id === 'Matara' || e.target.id === 'Badulla' || e.target.id === 'Hatton' || e.target.id === 'Batticaloa' || e.target.id === 'Vavuniya'){
      setSearchData({...searchData, destination: e.target.id});
    }
    if(e.target.id === 'searchTerm'){
      setSearchData({...searchData, searchTerm: e.target.value});
    }
    if (e.target.type === 'select-one'){
      setSearchData({...searchData, [e.target.id]: e.target.value,});
    }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const urlParame = new URLSearchParams()
  urlParame.set('searchTerm', searchData.searchTerm)
  urlParame.set('type', searchData.type)
  urlParame.set('from', searchData.from)
  urlParame.set('destination', searchData.destination)
  const searchQuery = urlParame.toString();
  navigate(`/admin/train?${searchQuery}`)
};


const handleTrainDelete = async (trainID) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
  
          try {
  
            const res = await fetch(`/api/train/delete/${trainID}`,{
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            Swal.fire({
              title: "Deleted!",
              text: "Your train schedule has been deleted.",
              icon: "success"
            });
            setTrains((prev)=> prev.filter((train)=> train._id !== trainID));
          } catch (error) {
            console.log(error.message);
          } 
        }
      });
  };
  return (
    <div>
         <div>
      <div className="list--header">
        <div className='user--title'>
          <h1>Train Management</h1>
          <div className='user--btn'>
            <Link to={"/add-train"}>
                <button className="btn1">Add Train</button>
            </Link>
            <button className="btn2">Download Report</button>
          </div>
        </div>
        <br/>
        <form onSubmit={handleSubmit}>
        <div className='search--line gap-3 text-center'>
          <input type="text" placeholder="Search..." onChange={handleChange} id='searchTerm'/>
          <select className='border p-3 rounded-lg' name='type' id='type' required onChange={handleChange} >
              <option className='text-slate-400' hidden >Type</option>
              <option value="Express">Express</option>
              <option value="Intercity">Intercity</option>
              <option value="Slow">Slow</option>
          </select>
          <select className='border p-3 rounded-lg' name='from' id='from' required onChange={handleChange} >
              <option className='text-slate-400' hidden >From</option>
              <option value="Colombo Fort">Colombo Fort</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Badulla">Badulla</option>
              <option value="Hatton">Hatton</option>
              <option value="Batticaloa">Batticaloa</option>
              <option value="Vavuniya">Vavuniya</option>
          </select>
          <p className='mt-3 text-lg'>to</p>
          <select className='border p-3 rounded-lg' name='destination' id='destination' required onChange={handleChange} >
              <option className='text-slate-400' hidden >Destination</option>
              <option value="Colombo Fort">Colombo Fort</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Badulla">Badulla</option>
              <option value="Hatton">Hatton</option>
              <option value="Batticaloa">Batticaloa</option>
              <option value="Vavuniya">Vavuniya</option>
          </select>
          
          <button className='bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16'>Search</button>
        </div> 
        </form>

        <div className="list--container">
          <table className="list">
            <tbody>
              <tr className='font-semibold text-blue-900 text-lg text-center'>
                <td>Train Name</td>
                <td>Category</td>
                <td>From</td>
                <td>Departure Time</td>
                <td>Destination</td>
                <td>Arrival Time</td>
                <td>Action</td>
              </tr>
              {trains.map((train) => (
                <tr className='text-center'>
                  <td>
                    <div className='user--details text-left '>
                      <h2>{train.trainName}</h2>   
                    </div>
                  </td>
                    <td>{train.category}</td>
                    <td>{train.from}</td>
                    <td>{train.departureTime}</td>
                    <td>{train.destination}</td>
                    <td>{train.arrivalTime}</td>
                    <td>
                        <div className='flex flex-row gap-3 '>
                            <button className="text-3xl text-blue-700 font-bold"><FcInfo /></button>
                            <Link to={`/update-train/${train._id}`}>
                            <button className="text-green-700 text-3xl hover:text-green-400 focus:scale-95 transition-all duration-200 ease-out"><MdEditSquare/></button>
                            </Link>
                            
                            <button onClick={()=>handleTrainDelete(train._id)} className="text-3xl text-red-700 font-bold"><MdDeleteForever/></button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}
