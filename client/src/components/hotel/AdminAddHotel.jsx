import React from "react";
import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import CreateHotel from "../../pages/hotel/CreateHotel";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AdminAddHotel() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <Link to={"/admin/hotels"}>
          <button className="bg-slate-700 rounded-xl text-white  text-4xl">
            <IoMdArrowRoundBack />
          </button>
        </Link>
        <div className="ml-20 bg-slate-100 rounded-lg">
          <Routes>
            <Route path="/" element={<CreateHotel />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
