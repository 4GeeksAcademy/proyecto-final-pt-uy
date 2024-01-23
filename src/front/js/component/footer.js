import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer bg-secondary mt-auto py-3">
		{/* Footer information container */}
		<div className="container mt-5">

			{/* Footer 1st row */}
			<div className="d-flex mb-4">

				{/* Navigation menu */}
				<div className="d-flex align-items-center">
					<Link to="/" className="text-body-color fw-medium text-decoration-none me-3">
						Inicio
					</Link>
					<Link to="/animal-list" className="text-body-color fw-medium text-decoration-none mx-3">
						Peluditos
					</Link>
					<Link to="/recomendations" className="text-body-color fw-medium text-decoration-none mx-3">
						Información
					</Link>
					<Link to="/about" className="text-body-color fw-medium text-decoration-none mx-3">
						Sobre Nosotros
					</Link>
					<Link to="/about" className="text-body-color fw-medium text-decoration-none mx-3">
						Contacto
					</Link>
				</div>

				{/* Social media and contact information */}
				<div className="ms-auto d-flex align-items-center">
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
			<hr/>

			{/* Footer 2nd row */}
			<div className="d-flex fs-7 text-neutral-60 mt-4">
				<p>
					© 2024 El Refugio. Todos los derechos reservados.
				</p>
			</div>
		</div>
	</footer>
);
