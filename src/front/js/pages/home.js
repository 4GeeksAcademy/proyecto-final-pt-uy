import React from "react";
import { Link } from "react-router-dom";

import backgrondColors_image from "../../img/backgroundColors_image.png"
import home_image from "../../img/home_image.png"

export const Home = () => {

	return (
		<div>
			{/*Intro*/}
			<div className="mb-5" style={{ backgroundImage: `url(${backgrondColors_image})`, backgroundPosition: "center top" }}>
				<div className="container d-flex flex-column flex-lg-row pt-5">
					<div className="col-lg-6 mb-3">
						<h1 className="fw-light mb-0">Salvar Una Vida</h1>
						<h2 className="fw-semibold">Puede Cambiar La Tuya</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
						<div className="">
							<button className="btn btn-outline-primary rounded-pill me-3 mt-3 px-4 py-2">Ver Intro <i class="fa-solid fa-play"></i></button>
							<Link to="/animal-list">
								<button className="btn btn-primary rounded-pill px-4 py-2 mt-3">Encuentra tu amigo ideal</button>
							</Link>
						</div>
					</div>
					<div className="col-lg-6">
						<figure className="m-0">
							<img src={home_image} alt="home image" className="img-fluid" />
						</figure>
					</div>
				</div>
			</div>

			{/*Aleatory selected animals*/}
		</div>
	);
};
