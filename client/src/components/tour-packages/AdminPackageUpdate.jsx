import React from "react";
import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import UpdatePkg from "../../pages/tourPkg/UpdatePkg";

export default function AdminPackageUpdate() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <div className="ml-20 bg-slate-100 rounded-lg">
          <Routes>
            <Route path="/" element={<UpdatePkg />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
