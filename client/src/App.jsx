
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PrivateRouteTourist from "./components/PrivateRouteTourist";
import PrivateRouteSeller from "./components/PrivateRouteSeller";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import AddItems from "./pages/AddItems";
import Layout from "./components/headers/Layout";
import Footer from "./components/Footer";
import EventTable from "./components/eventAct/EventTable";
import ProfileS from "./pages/ProfileS";
import Admin from "./pages/Admin";
import ProfileAd from "./pages/ProfileAd";
import CreatePkg from "./pages/tourPkg/CreatePkg";
import ListedItems from "./pages/ListedItems";
import UpdatePkg from "./pages/tourPkg/UpdatePkg";
import Packages from "./pages/tourPkg/Packages";
import SearchPkg from "./pages/tourPkg/SearchPkg";
import SignUpN from "./pages/SignUpN";
import CreateEvent from "./pages/eventAct/CreateEvent";
import ShowEvent from "./pages/eventAct/ShowEvent";
import UpdateEvent from "./pages/eventAct/UpdateEvent";
import DeleteEvent from "./pages/eventAct/DeleteEvent";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Home from './pages/Home';
import PrivateRouteTourist from './components/PrivateRouteTourist';
import PrivateRouteSeller from './components/PrivateRouteSeller';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import AddItems from './pages/AddItems';
import Layout from './components/headers/Layout';
import Footer from './components/Footer';
import ProfileS from './pages/ProfileS';
import Admin from './pages/Admin';
import ProfileAd from './pages/ProfileAd';
import CreatePkg from './pages/tourPkg/CreatePkg';
import ListedItems from './pages/ListedItems';
import UpdatePkg from './pages/tourPkg/UpdatePkg';
import Packages from './pages/tourPkg/Packages';
import SearchPkg from './pages/tourPkg/SearchPkg';
import SignUpN from './pages/SignUpN';
import { AdminUM } from './components/user/AdminUM';


import Vehicle from './pages/VehicleManagement/Vehicle';
import AddVehicle from './pages/VehicleManagement/AddVehicle';
import DeleteVehicle from './pages/VehicleManagement/DeleteVehicle';
import EditBook from './pages/VehicleManagement/EditVehicle';
import ShowBook from './pages/VehicleManagement/ShowVehicle';
import ShowVehicle from './pages/VehicleManagement/ShowVehicle';
import EditVehicle from './pages/VehicleManagement/EditVehicle';






export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/sign-in" element={<SignUpN />} />
        <Route path="/sign-up" element={<SignUpN />} />
        <Route path="/about" element={<About />} />
        <Route path="/packages/:packageId" element={<Packages />} />
        <Route path="/package-search" element={<SearchPkg />} />

        <Route element={<PrivateRouteTourist />}>
          <Route path="/profile" element={<Profile />} />
        </Route>


        <Route element={<PrivateRouteSeller />}>
          <Route path="/additems" element={<AddItems />} />
          <Route path="/seller/profile" element={<ProfileS />} />
          <Route path="/create-package" element={<CreatePkg />} />
          <Route path="/update-package/:packageId" element={<UpdatePkg />} />
          <Route path="/my-packages/:packageId" element={<Packages />} />
          <Route path="/my-items" element={<ListedItems />} />
        </Route>

        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/profile" element={<ProfileAd />} />
        </Route>

      <Route element = {<PrivateRouteAdmin/>}>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/user' element={<AdminUM/>}/>
        <Route path='/admin/profile' element={<ProfileAd/>}/>
      </Route> 

      

      <Route path='/Vehicle' element={<Vehicle/>}/>
      <Route path='/Vehicle/add' element={<AddVehicle/>}/>
      <Route path='Vehicle/delete/:id' element={<DeleteVehicle/>}/>
      <Route path='Vehicle/update/:id' element={<EditVehicle/>}/>
      <Route path='Vehicle/get/:id' element={<ShowVehicle/>}/>
    


  </Routes> 
  <Footer/>


        <Route>
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/admin" element={<EventTable />} />
          <Route path="/events/details/:id" element={<ShowEvent />} />
          <Route path="/events/update/:id" element={<UpdateEvent />} />
          <Route path="/events/delete/:id" element={<DeleteEvent />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
