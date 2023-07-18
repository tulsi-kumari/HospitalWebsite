
import './App.css';
import HeaderWrap from './components/Header/HeaderWrap';
import Home from './components/Header/Home';
import AdminPage from './components/Header/AdminPage';
import PatientPage from './components/Header/PatientPage';
import DoctorPage from './components/Header/DoctorPage';
import ErrorPage from './components/Header/Error404';
import LogoutPage from './components/Header/LogoutPage';
import { Routes, Route } from "react-router-dom";
import AccessDenied from './components/Header/AccessDenied';
import 'bootstrap/dist/css/bootstrap.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Footer from './components/Header/Footer';


import "./index.css";

function App() {
  return (
    
      <div className="App">
         <HeaderWrap/>
         
       <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/PatientPage' element={<PatientPage />}></Route>
        <Route path='/AdminPage' element={<AdminPage />} ></Route>
        <Route path='/DoctorPage' element={<DoctorPage />} ></Route>
        <Route path='/AccessDenied' element={<AccessDenied/>} ></Route>
        <Route path='/Logout' element={<LogoutPage/>} ></Route>
        <Route path='*' element={<ErrorPage/>}></Route>
      </Routes>

      <Footer/>
      </div>
    
    
  );
}

export default App;
