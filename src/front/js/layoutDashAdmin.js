import React from "react";
import { Outlet, Link } from "react-router-dom";

import DashboardLeftPanel from "./component/dashboardLeftPanel";

const LayoutDashAdmin = () => {
  return (
    <div className="d-flex" style={{backgroundColor: "#F7F8FA"}}>

      {/* LEFT PANEL */}
      <DashboardLeftPanel />

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