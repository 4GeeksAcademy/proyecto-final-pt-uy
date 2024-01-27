import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";

import logo from "../../img/el_refugio_logo.png";


export const Navbar = () => {
	const navigate = useNavigate();
	const {store, actions} = useUserContext();

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
		<nav className="navbar navbar-expand-lg my-3">
			<div className="container">
				<Link to="/" className="logo-container me-4">
					<img src={logo} alt="Logo" />
				</Link>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/" className="mt-3 mt-lg-0 nav-link text-primary fw-medium text-decoration-none">
								Inicio
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/animal-list" className="nav-link text-primary fw-medium text-decoration-none">
								Peluditos
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/recomendations" className="nav-link text-primary fw-medium text-decoration-none">
								Información
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/about" className="nav-link text-primary fw-medium text-decoration-none">
								Sobre Nosotros
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/about" className="nav-link text-primary fw-medium text-decoration-none">
								Contacto
							</Link>
						</li>
					</ul>
					<Link 
						className="me-3 mb-3 mb-lg-0 nav-link ms-auto text-body-color fw-medium text-decoration-none"
						to={store.user.id ? "/profile" : "/register"} 
					>
						{store.user.id ? "Perfil" : "Regístrate"}
					</Link>

					{ 
						!store.user.id && 
						<Link to="/login" className="nav-link text-body-color fw-medium text-decoration-none">
							Ingresa
						</Link>
					}
					{ 
						store.user.id && 
						<button className="nav-link text-body-color fw-medium text-decoration-none" onClick={handleLogout}>
							Logout
						</button> 
					}
					
				</div>
			</div>
		</nav>
	);
};
