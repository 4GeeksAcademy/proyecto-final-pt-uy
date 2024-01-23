import React from "react";
import { Outlet, Link } from "react-router-dom";

import logo from "../img/el_refugio_logo.png";

const LayoutDashAdmin = () => {
  return (
    <div className="d-flex" style={{backgroundColor: "#F7F8FA"}}>

      {/* LEFT PANEL   */}
      <div className="dash-left-panel">
        <figure className='logo-container mb-4 mb-md-5'>
            <img src={logo} alt="Logo" />
        </figure>

        <button type='button' className="btn btn-secondary rounded-4 w-100">Ingresar Peludito</button>

        {/* Left Navbar */}
        <nav className="d-flex flex-column w-100 mt-3">
          <Link to={"/"} className="dash-panel-link fw-medium active"><i className="fa-regular fa-heart me-3"></i> Peluditos</Link>
          <Link to={"/"} className="dash-panel-link fw-medium"><i className="fa-regular fa-circle-user me-3"></i> Usuarios</Link>
          <Link to={"/"} className="dash-panel-link fw-medium"><i className="fa-regular fa-star me-3"></i> Testimonios</Link>
        </nav>
      </div>

      {/* RIGHT PANEL */}
      <div className="d-flex flex-column w-100" >

        {/* Navbar */}
        <nav  className="d-flex justify-content-end w-100 bg-white p-3 fw-medium">
          <ul class="nav m-0 p-0">
            <li class="nav-item m-0 p-0">
              <Link class="nav-link" to={"/"} >Perfil</Link>
            </li>
            <li class="nav-item m-0 p-0">
              <p class="nav-link">Logout</p>
            </li>
          </ul>
        </nav>

        {/* Main */}
        <Outlet />
      </div>      
    </div>
  );
};

export default LayoutDashAdmin;