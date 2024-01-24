import React from "react";
import { Outlet, Link } from "react-router-dom";

import DashboardLeftPanel from "./component/dashboardLeftPanel";
import DashboardNavbar from "./component/dashboardNavbar";

const LayoutDashAdmin = () => {
  return (
    <div className="container-fluid d-flex p-0 mt-2" style={{backgroundColor: "#F7F8FA", maxWidth: "1400px"}}>
      {/* LEFT PANEL */}
      <DashboardLeftPanel />

      {/* RIGHT PANEL */}
      <div className="d-flex flex-column w-100" >
        <DashboardNavbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>      
    </div>
  );
};

export default LayoutDashAdmin;