import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function DashboardLeftPanel() {

    return (
        <div className="dash-left-panel">
            <Link to="/" className='logo-container mb-4 mb-md-5'>
                <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
            </Link>

            <NavLink to={"/add-animal"} className="btn btn-outline-primary rounded-4 w-100 mb-2">Registrar Peludito</NavLink>
            <NavLink to={"/add-adoption"} className="btn btn-secondary rounded-4 w-100">Registrar Adopción</NavLink>

            {/* Left Navbar */}
            <nav className="d-flex flex-column w-100 mt-3">
                <NavLink to={"/table-animals"} className="dash-panel-link fw-medium"><i className="fa-solid fa-paw me-3"></i> Peluditos</NavLink>
                <NavLink to={"/table-users"} className="dash-panel-link fw-medium"><i className="fa-solid fa-circle-user me-3"></i> Usuarios</NavLink>
                <NavLink to={"/table-reviews"} className="dash-panel-link fw-medium"><i className="fa-solid fa-star me-3"></i> Testimonios</NavLink>
                <NavLink to={"/table-adoptions"} className="dash-panel-link fw-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-heart-fill me-3" viewBox="0 0 16 16">
                        <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"/>
                        <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"/>
                    </svg> 
                    Adopciones
                </NavLink>
            </nav>
        </div>
    );
}