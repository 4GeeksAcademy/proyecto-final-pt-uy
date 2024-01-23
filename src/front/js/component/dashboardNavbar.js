import React from "react";
import { Link } from "react-router-dom";

export default function DashboardNavbar() {

    return (
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
    );
}