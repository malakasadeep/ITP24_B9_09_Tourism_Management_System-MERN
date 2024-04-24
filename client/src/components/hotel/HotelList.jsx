import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdInfo } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import loadingimg from "../../assets/img/loading.gif";
import HotelReport from "./HotelReport";
import Swal from "sweetalert2";

export default function HotelList() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm:'',
        type:'all',
        availableWork: '',
        province:'',
        city:'',
        sort:'created_at',
        order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('searchTerm') || '';
   // const type = urlParams.get('type') || 'all';
   // const availableWork = urlParams.get('availableWork') || '';
   // const province = urlParams.get('province') || '';
   // const city = urlParams.get('city') || '';
   // const sort = urlParams.get('sort') || 'created_at';
    //const order = urlParams.get('order') || 'desc';
    setSearchData({searchTerm});
    

    const fetchHotel = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/hotel/gethotels?${searchQuery}`);
      const data = await res.json();
      setHotels(data);
      setLoading(false);
    };
    fetchHotel();
  }, [location.search]);

  const handleChange = (e) => {
 
    if(e.target.id === 'all'||e.target.id === '3 Star Hotel'  || e.target.id === '4 Star Hotel' || e.target.id === '5 Star Hotel'){
        setSearchData({...searchData, type: e.target.id});
    }
    if(e.target.id === 'available'||e.target.id === 'not available' ){
        setSearchData({...searchData, availableWork: e.target.id});
    }
    
    if(e.target.id === 'searchTerm'){
        setSearchData({...searchData, searchTerm: e.target.value});
    }
    if(e.target.id === 'province'){
        setSearchData({...searchData, province: e.target.value});
    }
    if(e.target.id === 'city'){
        setSearchData({...searchData, city: e.target.value});
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
    // urlParame.set('type', searchData.type)
    // urlParame.set('availableWork', searchData.availableWork)
    // urlParame.set('province', searchData.province)
    // urlParame.set('city', searchData.city)
    // urlParame.set('sort', searchData.sort)
    // urlParame.set('order', searchData.order)
    const searchQuery = urlParame.toString();
    navigate(`/admin/hotels?${searchQuery}`);
};

  function truncateTitle(title) {
    const words = title.split(" ");
    if (words.length <= 2) {
      return title;
    }
    return `${words.slice(0, 2).join(" ")} ...`;
  }

  const handleHotelDelete = async (hotelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/Hotel/delete/${hotelId}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          Swal.fire({
            title: "Deleted!",
            text: "Package has been deleted.",
            icon: "success",
          });
          setHotels((prev) => prev.filter((hotel) => hotel._id !== hotelId));
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };
  return (
    <div>
      <div className="list--header">
        <div className="user--title">
          <h1>Hotel Management</h1>
          <div className="user--btn ml-60">
            <HotelReport hotels={hotels} />
          </div>
        </div>
        <br />
        <div className="search--line">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            id="searchTerm"
          />
          <button
            onClick={handleSubmit}
            className="bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16"
          >
            Search
          </button>
        </div>

        <div class="list--container">
          {!loading && hotels.length === 0 && (
            <p className="text-2xl text-center p-5 text-blue-950">
              No Users found
            </p>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center">
              <img src={loadingimg} alt="loading" className="w-28" />
              <p className="text-lg w-full text-center">Loading....</p>
            </div>
          )}
          {!loading && hotels.length > 0 && (
            <table class="list">
              <tbody className="text-center items-center">
                <tr className="font-semibold text-blue-900 text-lg text-center">
                  <td>Hotels</td>
                  <td>Name</td>
                  <td>Type</td>
                  <td>City</td>
                  <td>Province</td>
                  <td>AvailableWork</td>
                  <td>Roomtype</td>
                  <td>Price</td>
                 
                </tr>

                {hotels.map((hotel) => (
                  <tr className="w-1/2 mx-auto text-center" key={hotel._id}>
                    <td className="w-full">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center">
                          <img
                            src={hotel.hotelImgs[0]}
                            alt=""
                            className="h-20 w-20 object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="">{truncateTitle(hotel.title)}</h2>
                        </div>
                      </div>
                    </td>
                    <td>{hotel.name}</td>
                    <td>{hotel.type}</td>
                    <td>{hotel.city}</td>
                    <td>{hotel.province}</td>
                    <td>{hotel.availableWork}</td>
                    <td>{hotel.roomtype}</td>
                    <td>${hotel.price}</td>
                   

                    <td className="">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/hotels/${hotel._id}`}
                          className="p-2 bg-blue-700 rounded-lg text-white"
                        >
                          <MdInfo className="text-2xl" />
                        </Link>
                        <Link
                          to={`/admin/hotels/update/${hotel._id}`}
                          className="p-2 bg-green-700 rounded-lg text-white"
                        >
                          <FaEdit className="text-2xl" />
                        </Link>
                        <button
                          className="p-2 bg-red-700 rounded-lg text-white"
                          onClick={() => handleHotelDelete(hotel._id)}
                        >
                          <MdDeleteForever className="text-2xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
