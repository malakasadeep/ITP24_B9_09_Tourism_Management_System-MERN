import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import { TrainList } from "./TrainList";
export const AdminTrainManagement = () => {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <div>
          <Routes>
            <Route path="/" element={<TrainList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
