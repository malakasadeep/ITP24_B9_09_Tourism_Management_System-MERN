import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Image1  from '../../assets/img/icons/package-page/person.png'
import '../../assets/css/user/userList.css'
export const UserList = () => {

  const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        searchTerm:'',
        usertype:'all',
        sort:'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect (() => {
      const urlParams = new URLSearchParams(window.location.search);
      const searchTerm = urlParams.get('searchTerm') || '';
      const type = urlParams.get('type') || 'all';
      const sort = urlParams.get('sort') || 'created_at';
      const order = urlParams.get('order') || 'desc';
      setSearchData({searchTerm, type, sort, order});

      const fetchPkg = async () => {
          setLoading(true);
          const searchQuery = urlParams.toString();
          const res = await fetch(`/api/user/search?${searchQuery}`);
          const data = await res.json();
          setUsers(data);
          setLoading(false);
      }
      fetchPkg();
      
  }, [location.search]
  )

  const handleChange = (e) => {
    if(e.target.id === 'all' || e.target.id === 'reguler' || e.target.id === 'couple' || e.target.id === 'family'){
        setSearchData({...searchData, type: e.target.id});
    }
    if(e.target.id === 'searchTerm'){
        setSearchData({...searchData, searchTerm: e.target.value});
    }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const urlParame = new URLSearchParams()
  urlParame.set('searchTerm', searchData.searchTerm)
  urlParame.set('type', searchData.type)
  const searchQuery = urlParame.toString();
  navigate(`/admin/user?${searchQuery}`)
};

  return (
    <div>
      <div className="list--header">
        <div className='user--title'>
          <h1>Users Management</h1>
          <div className='user--btn'>
            <button className="btn1">Add User</button>
            <button className="btn2">Download Report</button>
          </div>
          
        </div>
        <br/>
        <div className='search--line'>
          <input type="text" placeholder="Search..." onChange={handleChange} id='searchTerm'/>
          <button onClick={handleSubmit} className='bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16'>Search</button>
        </div> 

        <div class="list--container">
          <table class="list">
            <tbody>
              <tr className='font-semibold text-blue-900 text-lg text-center'>
                <td>User</td>
                <td>Name</td>
                <td>Email</td>
                <td>Type</td>
                <td>Country</td>
              </tr>
              {users.map((user) => (
                <tr className='text-center'>
                  <td>
                    <div className='user--details text-left '>
                      <img src={user.avatar} alt="" className='user--img'/>
                      <h2>{user.username}</h2>   
                    </div>
                  </td>
                    <td>{user.firstname}</td>
                    <td>{user.email}</td>
                    <td>{user.usertype}</td>
                    <td>{user.country}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
