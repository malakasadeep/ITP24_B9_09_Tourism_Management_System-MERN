import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Header from './components/Header';

export default function App() {
  return <BrowserRouter>
  <Header />  
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<Signin />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/about' element={<About />} />
    <Route path='/profile' element={<Profile />} />

  </Routes>
  </BrowserRouter>
}
