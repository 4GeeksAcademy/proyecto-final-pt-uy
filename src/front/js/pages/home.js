import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import backgrondColors_image from "../../img/backgroundColors_image.png"
import home_image from "../../img/home_image.png"
import home_banner_bg from "../../img/homeBanner_background.png"
import home_banner_img from "../../img/homeBanner_image.png"
import paw_image from "../../img/pawBanner_image.png"
import loadingImg from '../../img/loading.gif';
import errorImg from '../../img/error.png';
import notFoundImg from '../../img/notFound.png';

import { getTestimonialsList } from "../../client-API/backendAPI";
import { useAnimalsContext } from "../contexts/animalsContext";

import RandomAnimalsList from "../component/randomAnimalsList";
import CardTestimony from "../component/cardTestimony";


export const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
	const [testimonialsList, setTestimonialsList] = useState([]);

	useEffect(() => {
		fetchTestimonials();
	}, [])

	const fetchTestimonials = async () => {
		setErrorMsg("");
        setIsLoading(true);
		
		try {
			const data = await getTestimonialsList();
			setTestimonialsList(data);
			setIsLoading(false);
		} catch (error) {
			console.error(`Error fetching testimonials list: `, error);
            setErrorMsg(error.message);
            setIsLoading(false);
		}
	}

	return (
		<div className="mb-5">
			{/*Intro*/}
			<div className="mb-5" style={{ backgroundImage: `url(${backgrondColors_image})`, backgroundPosition: "center top", backgroundSize: "cover" }}>
				<div className="container d-flex flex-column flex-lg-row pt-5">
					<div className="col-lg-6 mb-3">
						<h1 className="fw-light mb-0">Salvar Una Vida</h1>
						<h2 className="fw-semibold">Puede Cambiar La Tuya</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
						<div>
							<button className="btn btn-outline-primary rounded-pill me-3 mt-3 px-4 py-2">Ver Intro <i className="fa-solid fa-play ms-2"></i></button>
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
			<div className="container my-5">
				<p className="m-0">¿Crees en el destino?</p>
				<h5 className="fw-medium">Peluditos seleccionados aleatoriamente</h5>

				<RandomAnimalsList type="dog" limit={4} />
				<RandomAnimalsList type="cat" limit={4} />

				<Link to="/animal-list" className="text-decoration-none d-grid">
					<button className="btn btn-outline-primary rounded-pill px-4 py-2 mt-3">Ver Más <i className="ms-2 fa-solid fa-angle-right"></i></button>
				</Link>
			</div>

			{/* Banner */}
			<div className='container rounded-3 d-flex flex-lg-row justify-content-center' style={{ backgroundImage: `url(${home_banner_bg})`, backgroundPosition: "center top", backgroundSize: "cover" }}>
				<div className="col-lg-6 p-5 pe-lg-0 me-lg-0 mt-xl-3 mt-xxl-5">
					<div className="d-flex">
						<h2 className="fw-light mb-0 me-2">Un Nuevo Comienzo</h2>
						<img src={paw_image} alt="paw" className="img-fluid align-self-end" style={{ maxHeight: "35px", width: "auto" }} />
					</div>
					<h2 className="fw-medium">Adopción Responsable</h2>
					<p className="mb-0 mt-4 fw-medium">¿Es tu hogar el hogar que un peludito necesita?</p>
					<p className="fw-medium">Te contamos qué tener en cuenta antes de tomar tu decisión.</p>
					<div>
						<Link to="/recomendations">
							<button className="btn btn-primary rounded-pill px-4 py-2 mt-3 me-3">Más información</button>
						</Link>
						<button className="btn btn-outline-primary rounded-pill mt-3 px-4 py-2">Ver Video <i className="fa-solid fa-play ms-2"></i></button>
					</div>
				</div>
				<img src={home_banner_img} alt="hand and paw" className="col-lg-6 d-none d-lg-block" />
			</div>

			{/* Testimonies */}
			<div className="my-5 container">
				<h5 className="fw-medium">Testimonios</h5>
				{/*testimonies.length == 0 ?
					<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>
					:
				*/}
				<div className="p-2 grid gap-3 d-flex flex-row row-cols-2 scroll-bar" style={{ overflowX: "scroll" }} >
					{
						testimonialsList.map((testimony, index) => {
							return (
								<CardTestimony key={index} testimony={testimony}/>
							)
						})
					}
				</div>
			</div>
		</div>
	);
};
