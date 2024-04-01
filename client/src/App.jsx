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
import Layout from './components/headers/layout';
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

import Vehicle from './pages/VehicleManagement/Vehicle';
import AddVehicle from './pages/VehicleManagement/AddVehicle';
//import DeleteVehicle from './pages/VehicleManagement/DeleteVehicle';
import EditBook from './pages/VehicleManagement/EditVehicle';
import ShowBook from './pages/VehicleManagement/ShowVehicle';
import ShowVehicle from './pages/VehicleManagement/ShowVehicle';
import EditVehicle from './pages/VehicleManagement/EditVehicle';
// import VehicleCard from './components/VehicleManagement/vehicleCard';





export default function App() {
  return <BrowserRouter>
  
  <Layout/>
  <Routes>

      <Route path='/' element={<Home />} />

      <Route path='/sign-in' element={<SignUpN />} />
      <Route path='/sign-up' element={<SignUpN />} />
      <Route path='/about' element={<About />} />
      <Route path='/packages/:packageId' element={<Packages/>}/>
      <Route path='/package-search' element={<SearchPkg/>}/>

      <Route  element={<PrivateRouteTourist />} >
        <Route path='/profile' element={<Profile />} />
      </Route>

      <Route element = {<PrivateRouteSeller/>}>
        <Route path='/additems' element={<AddItems/>}/>
        <Route path='/seller/profile' element={<ProfileS/>}/>
        <Route path='/create-package' element={<CreatePkg/>}/>
        <Route path='/update-package/:packageId' element={<UpdatePkg/>}/>
        <Route path='/my-packages/:packageId' element={<Packages/>}/>
        <Route path='/my-items' element={<ListedItems/>}/>

      </Route> 

      <Route element = {<PrivateRouteAdmin/>}>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/profile' element={<ProfileAd/>}/>
      </Route> 

      
      <Route path='/Vehicle' element={<Vehicle/>}/>
      <Route path='/Vehicle/add' element={<AddVehicle/>}/>
      {/* <Route path='/VehicleCard'element={<VehicleCard/>}/> */}
      <Route path='Vehicle/update/:id' element={<EditVehicle/>}/>
      <Route path='Vehicle/get/:id' element={<ShowVehicle/>}/>
    
  </Routes> 
  <Footer/>

  </BrowserRouter>
}
