import React from "react";
import { Link } from "react-router-dom";

import logo from "../../img/el_refugio_logo.png";

export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg">
			<div class="container">
				<Link to="/" className="logo-container me-4">
					<img src={logo} alt="Logo" />
				</Link>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarText">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<Link to="/" className="mt-3 mt-lg-0 nav-link text-primary fw-medium text-decoration-none">
								Inicio
							</Link>
						</li>
						<li class="nav-item">
							<Link to="/animal-list" className="nav-link text-primary fw-medium text-decoration-none">
								Peluditos
							</Link>
						</li>
						<li class="nav-item">
							<Link to="/recomendations" className="nav-link text-primary fw-medium text-decoration-none">
								Información
							</Link>
						</li>
						<li class="nav-item">
							<Link to="/about" className="nav-link text-primary fw-medium text-decoration-none">
								Sobre Nosotros
							</Link>
						</li>
						<li class="nav-item">
							<Link to="/about" className="nav-link text-primary fw-medium text-decoration-none">
								Contacto
							</Link>
						</li>
					</ul>
					<Link to="/register" className="me-3 mb-3 mb-lg-0 nav-link ms-auto text-body-color fw-medium text-decoration-none">
						Regístrate
					</Link>
					<Link to="/login" className="nav-link text-body-color fw-medium text-decoration-none">
						Ingresa
					</Link>
				</div>
			</div>
		</nav>
	);
};
