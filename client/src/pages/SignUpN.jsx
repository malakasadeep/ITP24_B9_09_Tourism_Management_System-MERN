import { createRef, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInstart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import Swal from "sweetalert2";
import "./../assets/css/signUp.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function SignUpN() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpsending, setOtpSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [creating, setcreating] = useState(false);

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
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      if (data.isadmin === true) {
        navigation("/admin/dashbard");
      } else if (data.usertype === "Travel Service Providers") {
        navigation("/additems");
      } else {
        navigation("/");
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1500,
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
    if (e.target.type === "checkbox") {
      setFormDataUP({
        ...formDataUP,
        usertype: e.target.value,
      });
    } else if (
      e.target.type === "password" ||
      e.target.type === "text" ||
      e.target.type === "email"
    ) {
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

    if (formDataUP.password.length <= 6) {
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
      setOtpSending(true);
      const res = await fetch("/api/auth/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataUP),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        // Handle error if OTP sending fails
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${data.message}`,
        });
        setOtpSending(false);
      } else {
        // OTP sent successfully, display popup to enter OTP
        setIsOtpModalOpen(true);
        setOtpSending(false);
      }
    } catch (error) {
      // Handle error if fetch fails
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
      setOtpSending(false);
    }
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef(Array.from({ length: 6 }, () => createRef()));

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < 5) {
      inputRefs.current[index + 1].current.focus(); // Move focus to the next input
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log(enteredOtp);

    try {
      const res = await fetch("/api/auth/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formDataUP.email, otp: enteredOtp }), // Send entered OTP to server for verification
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        // Handle error if OTP verification fails

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${data.message}`,
        });
      } else {
        // OTP verified successfully, proceed with account creation
        setIsOtpModalOpen(false); // Close OTP popup
        // Proceed with account creation
        // Call function to submit sign-up form or navigate to next step

        try {
          setSignUpLoading(true);
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
            icon: "success",
          });

          navigation("/sign-in");
        } catch (error) {
          setSignUpLoading(false);
          setSignUpError(error.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}`,
          });
        }
      }
    } catch (error) {
      // Handle error if fetch fails
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div className={`ctr ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-ctr">
        <div className="signin-signup">
          <form
            onSubmit={handleSignInSubmit}
            className={`sign-in-form ${isSignUpMode ? "hidden" : ""} formenew`}
          >
            {/* ... Sign In form content ... */}

            <h2 className="title">Sign in</h2>
            <div className="input-field flex items-center">
              <FaEnvelope className="mr-2" />
              <input
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleSignInChange}
              />
            </div>
            <div className="input-field flex items-center">
              <FaLock className="mr-2" />
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleSignInChange}
              />
            </div>

            <button
              disabled={loading}
              className=" btn solid uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "sign in"}
            </button>
            <p className="social-text">Or Sign in with Google</p>
            <div className="">
              <OAuth />
            </div>
          </form>
          <form
            onSubmit={handleSignUpSubmit}
            className={`sign-up-form ${isSignUpMode ? "" : "hidden"} formenew`}
          >
            {/* ... Sign Up form content ... */}
            <h2 className="title">Sign up</h2>
            <div className="input-field flex items-center">
              <FaUser className="mr-2" />
              <input
                type="text"
                placeholder="Username"
                onChange={handleSignUpChange}
                id="username"
              />
            </div>
            <div className="input-field flex items-center">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                placeholder="Email"
                onChange={handleSignUpChange}
                id="email"
              />
            </div>
            <div className="input-field flex items-center">
              <FaLock className="mr-2" />
              <input
                type="password"
                placeholder="Password"
                onChange={handleSignUpChange}
                id="password"
              />
            </div>
            <div className="input-field flex items-center">
              <FaLock className="mr-2" />
              <input
                type="password"
                placeholder="Re-type Password"
                onChange={handleSignUpChange}
                id="repeatPassword"
              />
            </div>
            <div className="flex gap-3 items-center ">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="Travel Service Providers"
                  className="w-5"
                  onChange={handleSignUpChange}
                  value="Travel Service Providers"
                  checked={formDataUP.usertype === "Travel Service Providers"}
                />
                <span>Travel Service Providers</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="Tourist"
                  className="w-5"
                  onChange={handleSignUpChange}
                  value="Tourist"
                  checked={formDataUP.usertype === "Tourist"}
                />
                <span>Tourist</span>
              </div>
            </div>

            <button
              disabled={otpsending || signUpLoading}
              className="btn uppercase hover:opacity-95 disabled:opacity-80"
            >
              {otpsending
                ? "Sending OTP..."
                : signUpLoading
                ? "creating Account..."
                : "sign up"}
            </button>
            <p className="social-text">Or Sign in with Google</p>
            <div className="social-media">
              <OAuth />
            </div>
          </form>
        </div>
      </div>
      {/* OTP Popup */}
      <Modal
        isOpen={isOtpModalOpen}
        onRequestClose={() => setIsOtpModalOpen(false)}
        contentLabel="OTP Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
          <p className="text-gray-600 mb-4">
            A 6-digit OTP has been sent to your email. Please check your email
            inbox and enter the OTP below to continue.
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="flex justify-center space-x-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={inputRefs.current[index]}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center border border-blue-700 rounded focus:outline-none"
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Confirm
            </button>
          </form>
        </div>
      </Modal>

      <div className="panels-ctr">
        <div className="panel left-panel">
          {/* ... Left panel content ... */}
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={handleSignUpClick}
            >
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
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleSignInClick}
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
