import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import AddItems from './pages/AddItems';
import Layout from './components/headers/layout';
import Footer from './components/Footer';
import ProfileS from './pages/ProfileS';
import Admin from './pages/Admin';
import ProfileAd from './pages/ProfileAd';




export default function App() {
  return <BrowserRouter>
  
  <Layout/>
  <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/about' element={<About />} />

      <Route  element={<PrivateRoute />} >
        <Route path='/profile' element={<Profile />} />
      </Route>

      <Route element = {<PrivateRoute/>}>
        <Route path='/additems' element={<AddItems/>}/>
        <Route path='/selprofile' element={<ProfileS/>}/>
      </Route> 

      <Route element = {<PrivateRoute/>}>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/adminprofile' element={<ProfileAd/>}/>
      </Route> 
  </Routes> 
  <Footer/>

  </BrowserRouter>
}
