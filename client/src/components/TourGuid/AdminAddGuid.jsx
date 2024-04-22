import React from "react";
import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Add_Guide from "../../pages/tourGuid/Add_Guide";

export default function AdminAddGuid() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <Link to={"/admin/guid"}>
          <button className="bg-slate-700 rounded-xl text-white  text-4xl">
            <IoMdArrowRoundBack />
          </button>
        </Link>
        <div className="ml-20 bg-slate-100 rounded-lg">
          <Routes>
            <Route path="/" element={<Add_Guide />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
