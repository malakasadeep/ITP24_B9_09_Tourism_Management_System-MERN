import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import SellerHeader from "./SellerHeader";
import Adminheader from "./Adminheader";

const Layout = () => {
  const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  };

  const AuthContext = createContext(INITIAL_STATE);

  const { user } = useContext(AuthContext);

  const location = useLocation();

  const showHeader =
    location.pathname === "/" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/sign-in" ||
    location.pathname === "/profile" ||
    location.pathname === "/profile-update" ||
    location.pathname === "/hotel-search" ||
    location.pathname === "/guid/search" ||
    location.pathname === "/VehicleHome" ||
    location.pathname.startsWith("/packages/") ||
    location.pathname.startsWith("/res") ||
    location.pathname.startsWith("/train/") ||
    location.pathname.startsWith("/Hotel/") ||
    location.pathname.startsWith("/guiding/") ||
    location.pathname.startsWith("/Vehicle/book/") ||
    location.pathname === "/package-search";

  const showSellerHeader =
    location.pathname === "/additems" ||
    location.pathname === "/seller/profile" ||
    location.pathname === "/seller/profile-update" ||
    location.pathname === "/create-package" ||
    location.pathname === "/my-items" ||
    location.pathname === "/create-hotel" ||
    location.pathname === "/Vehicle/add" ||
    location.pathname === "/add-guide" ||
    location.pathname.startsWith("/update-package/") ||
    location.pathname.startsWith("/Vehicle/get/") ||
    location.pathname.startsWith("/Vehicle/update/") ||
    location.pathname.startsWith("/my-packages/") ||
    location.pathname.startsWith("/seller/") ||
    location.pathname.startsWith("/events/");

  return (
    <div>
      {showSellerHeader ? <SellerHeader /> : showHeader ? <Header /> : ""}
    </div>
  );
};

export default Layout;
