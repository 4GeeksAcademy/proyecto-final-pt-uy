import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useUserContext();

	const handleLogout = () => {
		actions.setToken("");
		actions.setUser({
			id: "",
			name: "",
			role: ""
		});
		navigate("/login");
	}

	return (
		<nav className="navbar navbar-expand-lg my-4">
			<div className="container">
				<NavLink to="/" className="logo-container me-4">
					<img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
				</NavLink>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink to="/" className="mt-3 mt-lg-0 nav-link text-primary fw-medium text-decoration-none">
								Inicio
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/animal-list" className="nav-link text-primary fw-medium text-decoration-none">
								Peluditos
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/recomendations" className="nav-link text-primary fw-medium text-decoration-none">
								Información
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/about" className="nav-link text-primary fw-medium text-decoration-none">
								Sobre Nosotros
							</NavLink>
						</li>
						<li className="nav-item text-primary fw-medium">
							<button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="nav-link text-primary">
								Contacto
							</button>
						</li>
					</ul>

					<div class="modal fade text-center" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Contacto</h5>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
								</div>
								<div className="modal-body">
									<p className='f-5 fw-medium'>Nuestros medios de contacto:</p>
									<div className="text-start">
										<p><i className="fa-solid fa-phone me-2"></i>+598 12 345 678</p>
										<p><i className="fa-solid fa-envelope me-2"></i>elproyectorefugio@gmail.com</p>
									</div>
									<hr />
									<p>¡También te invitamos a seguirnos en nuestras redes sociales!</p>
									<NavLink to="" className="text-body-color fs-5 fw-medium text-decoration-none me-3">
										<i className="fa-brands fa-facebook"></i>
									</NavLink>
									<NavLink to="" className="text-body-color fs-5 fw-medium text-decoration-none mx-3">
										<i className="fa-brands fa-instagram"></i>
									</NavLink>
								</div>
							</div>
						</div>
					</div>

					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">

						{ // NavLink para ir al Admin Dashboard
							store.user.role === "admin" &&
							<li className="nav-item">
								<NavLink to="/table-animals" className="nav-link text-primary fw-medium text-decoration-none">
									<i className="fa-solid fa-list-check"></i> Dashboard
								</NavLink>
							</li>
						}

						{ // Links visibles si hay un usuario logeado
							store.user.id &&
							<>
								<li className="nav-item">
									<NavLink to="/profile" className="nav-link text-primary fw-medium text-decoration-none">
										<i className="fa-solid fa-address-card"></i> Perfil
									</NavLink>
								</li>
								<li className="nav-item">
									<button className="nav-link text-primary fw-medium text-decoration-none" onClick={handleLogout}>
										<i className="fa-solid fa-right-from-bracket"></i> Logout
									</button>
								</li>
							</>
						}

						{ // Links visibles si NO hay un usuario logeado
							!store.user.id &&
							<>
								<li className="nav-item">
									<NavLink to="/register" className="nav-link text-primary fw-medium text-decoration-none">
										Regístrate
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/login" className="nav-link text-primary fw-medium text-decoration-none">
										Ingresa
									</NavLink>
								</li>
							</>
						}
					</ul>
				</div>
			</div>
		</nav>
	);
};
