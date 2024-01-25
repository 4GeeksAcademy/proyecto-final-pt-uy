import React from "react";
import { Outlet, Link } from "react-router-dom";

import DashboardLeftPanel from "./component/dashboardLeftPanel";
import DashboardNavbar from "./component/dashboardNavbar";

const LayoutDashAdmin = () => {
  return (
    <div className="container-fluid d-flex p-0 mt-2 bg-linear-0 vh-100" style={{maxWidth: "1400px"}}>
      {/* LEFT PANEL */}
      <div className="offcanvas-md offcanvas-start" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel" style={{maxWidth: "75vw"}}>
        <div className="d-flex justify-content-end bg-white d-md-none position-relative z-3">
          <button 
            type="button" 
            className="btn-close position-absolute" 
            style={{top: "1rem", right: "1rem"}}
            data-bs-dismiss="offcanvas" 
            data-bs-target="#offcanvasResponsive" 
            aria-label="Close">
          </button>
        </div>
        <DashboardLeftPanel />
      </div>


      {/* RIGHT PANEL */}
      <div className="d-flex flex-column w-100" >
        <div className="d-flex justify-content-between">
          <button className="btn d-md-none bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
            <i className="fa-solid fa-bars ps-3"></i>
          </button>
          <DashboardNavbar />
        </div>
        <div className="p-3 p-md-4 overflow-y-scroll">
          <Outlet />
        </div>
      </div>      
    </div>
  );
};

export default LayoutDashAdmin;