import React from "react";

import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import HotelList from "./HotelList";

export default function AdminPM() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <div>
          <Routes>
            <Route path="/" element={<HotelList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
