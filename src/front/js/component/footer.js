import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../../img/el_refugio_logo.png";

export const Footer = () => (
	<footer className="footer bg-linear mt-auto py-3">
		{/* Footer information container */}

		<div className="container mt-5">

			{/* Footer 1st row */}
			<div className="d-flex mb-4 flex-column flex-lg-row">

				{/* Navigation menu */}
				<div className="d-flex mb-4 flex-column flex-sm-row mx-auto mx-lg-0">
					<div className="d-flex align-items-center ">
						<Link to="/" className="text-body-color fw-medium text-decoration-none me-3">
							Inicio
						</Link>
						<Link to="/animal-list" className="text-body-color fw-medium text-decoration-none mx-3">
							Peluditos
						</Link>
						<Link to="/recomendations" className="text-body-color fw-medium text-decoration-none mx-3">
							Información
						</Link>
					</div>
					<div className="d-flex align-items-center mt-3 mt-sm-0">
						<Link to="/about" className="text-body-color fw-medium text-decoration-none mx-3">
							Sobre Nosotros
						</Link>
						<Link to="/about" className="text-body-color fw-medium text-decoration-none mx-3">
							Contacto
						</Link>
					</div>
				</div>

				{/* Social media and contact information */}
				<div className="d-flex align-items-center mx-auto me-lg-0 mt-3 mt-lg-0">
					<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none me-3">
						<i class="fa-brands fa-facebook"></i>
					</Link>
					<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none mx-3">
						<i class="fa-brands fa-instagram"></i>
					</Link>
					<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none mx-3">
						<i class="fa-solid fa-phone"></i>
					</Link>
					<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none ms-3">
						<i class="fa-regular fa-envelope"></i>
					</Link>
				</div>
			</div>

			{/* Horizontal line */}
			<hr />

			{/* Footer 2nd row */}
			<div className="d-flex align-items-center fs-7 text-neutral-60 mt-4 flex-column-reverse flex-lg-row">
				<p>
					© 2024 El Refugio. Todos los derechos reservados.
				</p>
				<figure className="logo-container mx-auto">
					<img src={logo} alt="Logo" />
				</figure>
				<div className="mb-3 mb-lg-0">
					<Link to="" className="me-4 text-decoration-none text-neutral-60">
						Términos y Condiciones
					</Link>
					<Link to="" className="text-decoration-none text-neutral-60">
						Políticas de Privacidad
					</Link>
				</div>

			</div>
		</div>
	</footer>
);
