import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInstart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import Swal from 'sweetalert2';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      dispatch(signInstart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
        return;

      }

      dispatch(signInSuccess(data));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1500
      });
      navigation('/');

    } catch (error) {

      dispatch(signInFailure(error.message));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });

    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='Email' id='email' className='border p-3 rounded-lg' onChange={handleChange}/> 
        <input type='password' placeholder='Password' id='password' className='border p-3 rounded-lg' onChange={handleChange}/> 
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'sign in'}</button>
        <OAuth/>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
