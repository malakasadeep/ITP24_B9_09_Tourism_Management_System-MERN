import React, { useEffect, useState } from 'react'
import TrainHero from '../../components/train/TrainHero'
import BookTrainAd from '../../components/train/BookTrainAd'
import TrainCard from '../../components/train/TrainCard'
import { useNavigate } from 'react-router-dom';

export default function TrainHome() {

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
  navigate(`/train/search?${searchQuery}`)
};
  return (
    <div className="mt-28" >
        <TrainHero className="mt-28" />
            <div className='flex  items-center bg-white mt-4 lg:mt-[-52px] px-8 shadow-lg max-w-[1240px] max-l-[240px]  p-4 lg:text-left text-center h-full mx-auto rounded-lg'>
            <form className='flex flex-wrap lg:flex-row justify-between px-0' onSubmit={handleSubmit}>
            <div className='w-full md:w-1/2 lg:w-1/2 '>
                <label for = 'from' className='py-3'>From</label> <br/>
                <select className='border rounded-md  p-3 lg:w-[300px] w-full'  name='from' id='from' required onChange={handleChange} >
                    <option className='text-slate-400' hidden >From</option>
              <option value="all">All</option>
              <option value="Colombo Fort">Colombo Fort</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Badulla">Badulla</option>
              <option value="Hatton">Hatton</option>
              <option value="Batticaloa">Batticaloa</option>
              <option value="Vavuniya">Vavuniya</option>
                </select>
                    
            </div>

          <div className='w-full md:w-1/2 lg:w-1/2 '>
            <label for = 'to' className='py-3'>To</label><br/>
            <select type='text' className='border rounded-md  p-3 lg:w-[300px] w-full' name='destination' id='destination' required onChange={handleChange}
            ><option className='text-slate-400' hidden >Destination</option>
            <option value="all">All</option>
            <option value="Colombo Fort">Colombo Fort</option>
            <option value="Galle">Galle</option>
            <option value="Matara">Matara</option>
            <option value="Badulla">Badulla</option>
            <option value="Hatton">Hatton</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Vavuniya">Vavuniya</option></select>
                
          </div>


          <div className='w-full md:w-1/2 lg:w-1/2 '>
            <label for = 'to' className='py-3'>Type</label><br/>
            <select type='text' list='nut' className='border rounded-md  p-3 lg:w-[300px] w-full' placeholder='First Class' name='type' id='type' required onChange={handleChange}>
            <option className='text-slate-400' hidden >Type</option>
              <option value="all">All</option>
              <option value="Express">Express</option>
              <option value="Intercity">Intercity</option>
              <option value="Slow">Slow</option>
            </select>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/2 '>
            <label for = 'to' className='py-3'>Train Name</label><br/>
            <input type='text'  className='border rounded-md  p-3 lg:w-[300px] w-full' placeholder="Search..." onChange={handleChange} id='searchTerm'></input>
                
          </div>

          

          <div className='mx-auto'>
          <button className='bg-transparent mt-5 mb-5 hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16'>Search</button>

          
            </div>

          
          

        </form>

      
      

    </div>
            <div className="md:px-24 mt-10">
                <div className="flex flex-wrap flex-col md:flex-row lg:mx-16 gap-[30px]">
                    {
                        trains?.map((item)=>(
                            <TrainCard
                                trainName ={item.trainName}
                                from = {item.from}
                                to = {item.destination}
                                arrivalTime={item.arrivalTime}
                                depatureTime = {item.departureTime}
                                noOfSeats = {item.noofseats}
                                id={item._id}
                                price={item.price}
                            />
                        ))
                    }
                    
                </div>
            </div>
            <BookTrainAd/>
    </div>
  )
}
