import React from "react";
import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import AddUser from "./AddUser";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AdminAddUser() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <Link to={"/admin/user"}>
          <button className="bg-slate-700 rounded-xl text-white  text-4xl">
            <IoMdArrowRoundBack />
          </button>
        </Link>
        <div className="ml-52">
          <Routes>
            <Route path="/" element={<AddUser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
