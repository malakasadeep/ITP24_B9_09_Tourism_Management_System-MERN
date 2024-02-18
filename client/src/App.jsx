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

//sasindu
import { HotelHome } from "./pages/hotel/HotelHome";
import AddHotel from "./pages/hotel/AddHotel";
import { AddRoom } from "./pages/hotel/AddRoom";
import UpdateHotel from "./pages/hotel/UpdateHotel";
import HotelVeiw from './components/hotel/HotelVeiw'
import HotelOverView from "./components/hotel/HotelOverview";
import HadminView from "./pages/hotel/HadminView";
import HotelReserve from "./components/hotel/HotelReserve";
import HotelBook from "./pages/hotel/HotelBook";

export default function App() {
  return <BrowserRouter>
  
  <Layout/>
  <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/sign-up' element={<SignUp />} />
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

        {/* Sasindu */}
      <Route path="/hotelhome" element={<HotelHome />} />
      <Route path="/hotels/new" element={<AddHotel />} />
      <Route path="/rooms/new/:id" element={<AddRoom />} />
      <Route path="/hotels/update/:id" element={<UpdateHotel />} />
      <Route path="/hotel/:id" element={<HotelVeiw />} />
      <Route path="/hoteloverview/:id" element={<HotelOverView />} />
      <Route path="/hoteladmin" element={<HadminView />} />
      <Route path="/hotelreserve/:id" element={<HotelReserve />} />
      <Route path="/hotelbooking" element={<HotelBook />} />
      
  </Routes> 
  <Footer/>

  </BrowserRouter>
}
