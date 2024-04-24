import React from "react";
import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import UpdateEvent from "../../pages/eventAct/UpdateEvent";

export default function AdminUpdateEvent() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <Link to={"/admin/events"}>
          <button className="bg-slate-700 rounded-xl text-white  text-4xl">
            <IoMdArrowRoundBack />
          </button>
        </Link>
        <div className="ml-5 bg-slate-100 rounded-lg w-[1000px]">
          <Routes>
            <Route path="/" element={<UpdateEvent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
