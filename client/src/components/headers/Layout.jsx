import React, { createContext, useContext} from 'react'
import { useLocation } from "react-router-dom";
import Header from './Header';
import SellerHeader from './SellerHeader';
import Adminheader from './Adminheader';



const Layout = () => {

    const INITIAL_STATE = {
        user: JSON.parse(localStorage.getItem("user")) || null,
        loading: false,
        error: null,
      };

    const AuthContext = createContext(INITIAL_STATE);  

    const { user } = useContext(AuthContext);

    const location = useLocation();

    //const showHeader = location.pathname === "/" || location.pathname === '/signup' || location.pathname === "/signin" || location.pathname === "profile";

    const showSellerHeader = location.pathname === "/additems" || location.pathname === "/selprofile";
    
    const showAdminHeader = location.pathname === "/admin" || location.pathname === "/adminprofile";
  return (
    <div>
        {showAdminHeader? (<Adminheader/>) : showSellerHeader? (<SellerHeader/>): (<Header/>)}
    </div>
  )
}

export default Layout;