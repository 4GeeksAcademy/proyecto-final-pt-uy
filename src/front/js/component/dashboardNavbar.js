import React from "react";
import { Link } from "react-router-dom";

export default function DashboardNavbar() {

    return (
        <nav  className="d-flex justify-content-end w-100 bg-white p-3 fw-medium">
          <ul className="nav m-0 p-0">
            <li className="nav-item m-0 p-0">
              <Link className="dash nav-link" to={"/"} ><i className="fa-solid fa-house"></i> Inicio</Link>
            </li>
          </ul>
        </nav>
    );
}