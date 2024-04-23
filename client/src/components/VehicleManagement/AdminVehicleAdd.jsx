import React from "react";
import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import AddVehicle from "../../pages/VehicleManagement/AddVehicle";

export default function AdminVehicleAdd() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <Link to={"/admin/vehicle"}>
          <button className="bg-slate-700 rounded-xl text-white  text-4xl">
            <IoMdArrowRoundBack />
          </button>
        </Link>
        <div className="ml-20 bg-slate-100 rounded-lg w-[1000px]">
          <Routes>
            <Route path="/" element={<AddVehicle />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
