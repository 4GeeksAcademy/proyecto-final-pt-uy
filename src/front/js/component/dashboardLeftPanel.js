import React from "react";
import { NavLink } from "react-router-dom";

export default function DashboardLeftPanel() {

    return (
        <div className="dash-left-panel">
            <figure className='logo-container mb-4 mb-md-5'>
                <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
            </figure>

            <NavLink to={"/add-animal"} className="btn btn-outline-primary rounded-4 w-100 mb-2">Registrar Peludito</NavLink>
            <NavLink to={"/add-adoption"} className="btn btn-secondary rounded-4 w-100">Registrar Adopción</NavLink>

            {/* Left Navbar */}
            <nav className="d-flex flex-column w-100 mt-3">
                <NavLink to={"/table-animals"} className="dash-panel-link fw-medium"><i className="fa-regular fa-heart me-3"></i> Peluditos</NavLink>
                <NavLink to={"/table-users"} className="dash-panel-link fw-medium"><i className="fa-regular fa-circle-user me-3"></i> Usuarios</NavLink>
                <NavLink to={"/table-reviews"} className="dash-panel-link fw-medium"><i className="fa-regular fa-star me-3"></i> Testimonios</NavLink>
                <NavLink to={"/table-adoptions"} className="dash-panel-link fw-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-heart me-3" viewBox="0 0 16 16">
                        <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982" />
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                    </svg> 
                    Adopciones
                </NavLink>
            </nav>
        </div>
    );
}