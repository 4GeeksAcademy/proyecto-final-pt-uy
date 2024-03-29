import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import EmailCopy from "./emailCopy";
import PhoneCopy from "./phoneCopy";

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
						<Link to="" data-bs-toggle="modal" data-bs-target="#contactModalFooter" className="text-body-color fw-medium text-decoration-none mx-3">
							Contacto
						</Link>
					</div>
				</div>

				<div class="modal fade text-center" id="contactModalFooter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="contactModalFooterLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Contacto</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
							</div>
							<div className="modal-body">
								<p className='f-5 fw-medium'>Nuestros medios de contacto:</p>
								<div className="text-start">
									<div className="d-flex align-items-center mb-2">
										<PhoneCopy />
										<p className="ms-2 mb-0">(+598) 12 345 678</p>
									</div>
									<div className="d-flex align-items-center mb-2">
										<EmailCopy />
										<p className="ms-2 mb-0">elrefugio@website-demo.com</p>
									</div>
								</div>
								<hr />
								<p>¡También te invitamos a seguirnos en nuestras redes sociales!</p>
								<a href="https://www.facebook.com/" className="text-body-color fs-5 fw-medium text-decoration-none me-3" target="_blank">
									<i className="fa-brands fa-facebook"></i>
								</a>
								<a href="https://www.instagram.com/" className="text-body-color fs-5 fw-medium text-decoration-none mx-3" target="_blank">
									<i className="fa-brands fa-instagram"></i>
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Social media and contact information */}
				<div className="d-flex align-items-center mx-auto me-lg-0 mt-3 mt-lg-0">
					<a href="https://www.facebook.com/" className="text-body-color fs-5 fw-medium text-decoration-none me-3" target="_blank">
						<i className="fa-brands fa-facebook"></i>
					</a>
					<a href="https://www.instagram.com/" className="text-body-color fs-5 fw-medium text-decoration-none mx-3" target="_blank">
						<i className="fa-brands fa-instagram"></i>
					</a>
					<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none mx-3">
						<PhoneCopy />
					</Link>
					<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none ms-3">
						<EmailCopy />
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
					<img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
				</figure>
				<div className="mb-3 mb-lg-0">
					<Link to="/terms-and-conditions" className="me-4 text-decoration-none text-neutral-60">
						Términos y Condiciones
					</Link>
					<Link to="/privacy-policies" className="text-decoration-none text-neutral-60">
						Políticas de Privacidad
					</Link>
				</div>

			</div>
		</div>
	</footer>
);
