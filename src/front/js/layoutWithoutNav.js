import React from "react";
import { Outlet } from "react-router-dom";

const LayoutWithoutNav = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LayoutWithoutNav;