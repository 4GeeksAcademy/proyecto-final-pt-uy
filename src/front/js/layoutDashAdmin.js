import React from "react";
import { Outlet, Link } from "react-router-dom";

import DashboardLeftPanel from "./component/dashboardLeftPanel";
import DashboardNavbar from "./component/dashboardNavbar";

const LayoutDashAdmin = () => {
  return (
    <div className="d-flex" style={{backgroundColor: "#F7F8FA"}}>
      {/* LEFT PANEL */}
      <DashboardLeftPanel />

      {/* RIGHT PANEL */}
      <div className="d-flex flex-column w-100" >
        <DashboardNavbar />
        <Outlet />
      </div>      
    </div>
  );
};

export default LayoutDashAdmin;