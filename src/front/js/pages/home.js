import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAnimalsContext } from "../contexts/animalsContext";

import CardAnimal from '../component/cardAnimal';


export const Home = () => {
	const { store: { animals, isLoading, error }, actions: { setAnimals } } = useAnimalsContext();

	useEffect(() => {
		setAnimals();
	}, []);


	return (
		<div className="mb-5">
			{/*Intro*/}
			<div className="mb-5" style={{ backgroundImage: `url("https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900069/Site/backgroundColors_image.png")`, backgroundPosition: "center top", backgroundSize: "cover" }}>
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
							<img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706901254/Site/home_image.png" alt="home image" className="img-fluid" />
						</figure>
					</div>
				</div>
			</div>

			{/*Aleatory selected animals*/}
			<div className="container my-5">
				<p className="m-0">¿Crees en el destino?</p>
				<h5 className="fw-medium">Peluditos seleccionados aleatoriamente</h5>

				{/*4 dogs cards*/}
				<div className="d-flex flex-wrap justify-content-evenly align-items-start gap-3 gap-lg-4 my-4">
					{/* Mientras espera la respuesta del backend */}
					{
						isLoading &&
						<div className='d-flex flex-column w-100 align-items-center'>
							<figure className='d-flex justify-content-center overflow-hidden w-100' style={{ maxWidth: "250px" }}>
								<img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800965/Site/loading_mtemdl.gif" />
							</figure>
							<p className='fw-semibold'>Cargando...</p>
						</div>
					}

					{/* Si se recibió un error de parte del backend */}
					{
						!isLoading && error &&
						<div className='d-flex flex-column w-100 align-items-center'>
							<figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "280px" }}>
								<img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800953/Site/error_pozpsi.png" />
							</figure>
							<p className='fw-semibold'>Lo sentimos, ha ocurrido un error inesperado.</p>
						</div>
					}

					{/* Si no está esperando respuesta, no recibió error y hay animales en el store */}
					{
						!isLoading && !error && animals &&
						animals.filter((animal, index) => index < 8).map((animal) => {
							return (
								<CardAnimal key={animal.id} animal={animal} />
							)
						})
					}

					{/* Si no está esperando respuesta, no recibió error y la lista de animales del store está vacía */}
					{
						!isLoading && !error && animals.length === 0 &&
						<div className='d-flex flex-column w-100 align-items-center'>
							<figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "200px" }}>
								<img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800999/Site/notFound_a0yxua.png" />
							</figure>
							<p className='fw-semibold text-center'>No hay peluditos que mostrar en este momento.</p>
						</div>
					}
				</div>
				{/*4 cats cards*/}


				<Link to="/animal-list" className="text-decoration-none d-grid">
					<button className="btn btn-outline-primary rounded-pill px-4 py-2 mt-3">Ver Más <i className="ms-2 fa-solid fa-angle-right"></i></button>
				</Link>
			</div>

			{/* Banner */}
			<div className='container rounded-3 d-flex flex-lg-row justify-content-center' style={{ backgroundImage: `url("https://res.cloudinary.com/dnwfyqslx/image/upload/v1706901469/Site/homeBanner_background.png")`, backgroundPosition: "center top", backgroundSize: "cover" }}>
				<div className="col-lg-6 p-5 pe-lg-0 me-lg-0 mt-xl-3 mt-xxl-5">
					<div className="d-flex">
						<h2 className="fw-light mb-0 me-2">Un Nuevo Comienzo</h2>
						<img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706902742/Site/pawBanner_image.png" alt="paw" className="img-fluid align-self-end" style={{ maxHeight: "35px", width: "auto" }} />
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
				<img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706902051/Site/homeBanner_image.png" alt="hand and paw" className="col-lg-6 d-none d-lg-block" />
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
						Array.from({ length: 12 }, (v, i) => i).map((card, index) => {
							return (
								<CardAnimal key={index} animal={animals[0]} />
							)
						})
					}
				</div>
			</div>
		</div>
	);
};
