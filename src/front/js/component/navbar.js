import React from "react";
import { Link } from "react-router-dom";

import logo from "../../img/el_refugio_logo.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
						<li className="nav-item me-4">
							<Link to="/" className="logo-container">
								<img src={logo} alt="Logo" />
							</Link>
						</li>
						<li className="nav-item mx-3">
							<Link to="/" className="text-body-color fw-medium text-decoration-none">
								Inicio
							</Link>
						</li>
						<li className="nav-item mx-3">
							<Link to="/animal-list" className="text-body-color fw-medium text-decoration-none">
								Peluditos
							</Link>
						</li>
						<li className="nav-item mx-3">
							<Link to="/recomendations" className="text-body-color fw-medium text-decoration-none">
								Información
							</Link>
						</li>
						<li className="nav-item mx-3">
							<Link to="/about" className="text-body-color fw-medium text-decoration-none">
								Sobre Nosotros
							</Link>
						</li>
						<li className="nav-item mx-3">
							<Link to="/about" className="text-body-color fw-medium text-decoration-none">
								Contacto
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
						<li className="nav-item mx-3">
							<Link to="/register" className="text-body-color fw-medium text-decoration-none">
								Regístrate
							</Link>
						</li>
						<li className="nav-item mx-3">
							<Link to="/login" className="text-body-color fw-medium text-decoration-none">
								Ingresa
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>

	);
};
