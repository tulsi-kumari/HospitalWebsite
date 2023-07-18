import React from 'react'
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Header = () => {
  return (
    <div className='Header'> 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <h4>HealthCareOrg</h4>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav itemnavbar">
{/*       
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/PatientPage">Patient Section</NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink className="nav-link" to="/DoctorPage">Doctor Section</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/AdminPage">Admin Section</NavLink>
      </li> */}

      <li className="nav-item">
        <NavLink className="nav-link" to="/Logout">Logout</NavLink>
      </li>


    </ul>

  </div>

</nav>
         
  
   
    </div>
  )
}

export default Header