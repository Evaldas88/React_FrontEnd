import { NavLink } from "react-router-dom";
import React from 'react';
import './Header.css';


function Header() {
  return (
    <nav className="navbar navbar-expand-xl navbar-expand-lg bg-dark">
      {/* <Link className="navbar-brand" to="/">  <img src={logo} alt="logo" style={{width:200, border:"0px solid black", borderRadius:"5px", marginLeft:"10px"}}/> </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
      <div className="navbar-collapse collapse" id="navbarNav">
        <div className="navbar-nav">
        <NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/">Home</NavLink>
        <NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/Passenger">Passenger</NavLink>
        <NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")}to="/flights">Flights </NavLink>
        </div>
      </div>
    </nav>
  );
}

 

export default Header;