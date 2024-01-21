import React, { createContext, useContext, useEffect} from 'react'
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

    const showHeader = location.pathname === "/" || 
                       location.pathname === '/sign-up' || 
                       location.pathname === "/sign-in" || 
                       location.pathname === "profile";

    const showSellerHeader = location.pathname === "/additems" || 
                             location.pathname === "/seller/profile" ||
                             location.pathname === "/create-package" || 
                             location.pathname === "/my-items" || 
                             location.pathname.startsWith('/update-package/') ||
                             location.pathname.startsWith('/my-packages/');
    
    const showAdminHeader = location.pathname === "/admin" || 
                            location.pathname === "/admin/profile";
  return (
    <div>
        {showAdminHeader? (<Adminheader/>) : showSellerHeader? (<SellerHeader/>): showHeader? (<Header/>) : ''}
    </div>
  )
}

export default Layout;