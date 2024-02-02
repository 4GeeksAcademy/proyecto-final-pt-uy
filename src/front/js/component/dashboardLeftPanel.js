import React from "react";
import { NavLink } from "react-router-dom";

export default function DashboardLeftPanel() {

    return (
        <div className="dash-left-panel">
            <figure className='logo-container mb-4 mb-md-5'>
                <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
            </figure>

            <NavLink to={"/add-animal"} className="btn btn-secondary rounded-4 w-100">Ingresar Peludito</NavLink>

            {/* Left Navbar */}
            <nav className="d-flex flex-column w-100 mt-3">
                <NavLink to={"/table-animals"} className="dash-panel-link fw-medium"><i className="fa-regular fa-heart me-3"></i> Peluditos</NavLink>
                <NavLink to={"/table-users"} className="dash-panel-link fw-medium"><i className="fa-regular fa-circle-user me-3"></i> Usuarios</NavLink>
                <NavLink to={"/table-reviews"} className="dash-panel-link fw-medium"><i className="fa-regular fa-star me-3"></i> Testimonios</NavLink>
            </nav>
        </div>
    );
}