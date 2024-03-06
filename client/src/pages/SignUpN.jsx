import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInstart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import Swal from 'sweetalert2';
import './../assets/css/SignUp.css'
import { FaUser, FaLock, FaEnvelope} from 'react-icons/fa';
export default function SignUpN() {

    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const handleSignUpClick = () => {
      setIsSignUpMode(true);
    };
  
    const handleSignInClick = () => {
      setIsSignUpMode(false);
    };


  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [signUpError, setSignUpError] = useState(null);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const handleSignInChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignInSubmit = async (e) => {
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
          text: `${data.message}`,
        });
        return;

      }
      dispatch(signInSuccess(data));
      if (data.isadmin === true){
        navigation("/admin");
      }else if(data.usertype === 'Travel Service Providers') {
        navigation('/additems');
      }else {
        navigation('/');
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1500
      });
      

    } catch (error) {

      dispatch(signInFailure(error.message));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });

    }
  };

  const [formDataUP, setFormDataUP] = useState({});
  const handleSignUpChange = (e) => {
    if (e.target.type === 'checkbox') {
      setFormDataUP({
        ...formDataUP,
        usertype: e.target.value,
      });
    } else if (e.target.type === 'password' || e.target.type === 'text' || e.target.type === 'email') {
      setFormDataUP({
        ...formDataUP,
        [e.target.id]: e.target.value,
      });
    }
  };
  

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formDataUP.email)) {
      Swal.fire("Please enter a valid email address", "", "error");
      return;
    }

    if (formDataUP.password.length <= 6 ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "password must at least have 8 charaters",
      });
      return;
    }

    if (formDataUP.password !== formDataUP.repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Not Matched!",
      });
      return;
    }

    try {
      
      setSignUpLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(formDataUP),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setSignUpLoading(false);
        setSignUpError(data.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${data.message}`,
        });
        return;
      }

      setSignUpLoading(false);
      setSignUpError(null);
      Swal.fire({
        title: "Succedd!",
        text: "Your profile created!",
        icon: "success"
      });
      
      navigation('/sign-in');

    } catch (error) {

      setSignUpLoading(false);
      setSignUpError(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });

    }
  };
  return (
    
    <div className={`ctr ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-ctr">
        <div className="signin-signup">
          <form onSubmit={handleSignInSubmit} className={`sign-in-form ${isSignUpMode ? 'hidden' : ''} formenew`}>
            {/* ... Sign In form content ... */}
            
            <h2 className="title">Sign in</h2>
            <div className="input-field flex items-center">
              <FaEnvelope className="mr-2"/>
              <input type="text" placeholder="Email" id='email' onChange={handleSignInChange}/>
            </div>
            <div className="input-field flex items-center">
              <FaLock className="mr-2" />
              <input type="password" placeholder="Password" id='password' onChange={handleSignInChange} />
            </div>
            
            <button disabled={loading} className=' btn solid uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'sign in'}</button>
            <p className="social-text">Or Sign in with Google</p>
            <div className="">
              <OAuth/>
            </div>
          
          </form>
          <form onSubmit={handleSignUpSubmit} className={`sign-up-form ${isSignUpMode ? '' : 'hidden'} formenew`}>
            {/* ... Sign Up form content ... */}
            <h2 className="title">Sign up</h2>
            <div className="input-field flex items-center">
              <FaUser className="mr-2" />
              <input type="text" placeholder="Username" onChange={handleSignUpChange} id='username'/>
            </div>
            <div className="input-field flex items-center">
              <FaEnvelope className="mr-2" />
              <input type="email" placeholder="Email" onChange={handleSignUpChange} id='email'/>
            </div>
            <div className="input-field flex items-center">
              <FaLock className="mr-2" />
              <input type="password" placeholder="Password" onChange={handleSignUpChange} id='password'/>
            </div>
            <div className="input-field flex items-center">
              <FaLock className="mr-2" />
              <input type="password" placeholder="Re-type Password" onChange={handleSignUpChange} id='repeatPassword'/>
            </div>
            <div className="flex gap-3 items-center ">
              
              <div className='flex gap-2'>
                  <input type='checkbox' id='Travel Service Providers' className='w-5' onChange={handleSignUpChange}  value='Travel Service Providers' checked={formDataUP.usertype === 'Travel Service Providers'} />
                  <span>Travel Service Providers</span>
              </div>
              <div className='flex gap-2'>
                  <input type='checkbox' id='Tourist' className='w-5' onChange={handleSignUpChange} value='Tourist' checked={formDataUP.usertype === 'Tourist'}/>
                  <span>Tourist</span>
              </div>
            </div>

            <button disabled={loading} className='btn uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'sign up'}</button>
            <p className="social-text">Or Sign in with Google</p>
            <div className="social-media">
              <OAuth/>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-ctr">
        <div className="panel left-panel">
          {/* ... Left panel content ... */}
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
          <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
            Sign up
          </button>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        </div>
        <div className="panel right-panel">
          {/* ... Right panel content ... */}
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
          <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
            Sign in
          </button>
        </div>
        <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};