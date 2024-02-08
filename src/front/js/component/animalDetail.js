import React from "react";

import { Link } from "react-router-dom";

import { formatAnimalData } from "../../utils/fromattingFunctions";

import Carousel from './carrousel';
import SocialShare from "./socialShare";


export default function AnimalDetail({ animal }) {
    const formattedAnimal = formatAnimalData(animal);

    return (
        <div className="container d-flex mb-5">
            <div className='row border rounded-5 outline-primary p-2 pt-4 bg-white'>
                <div className='col'>
                    <div className=' '>
                        <Carousel imgUrlsArray={formattedAnimal.image_urls} />
                    </div>
                    <SocialShare />
                </div>

                <div className='col pb-3'>
                    <div className='pe-5'>
                        <p className='mb-1'>ref. <span className='fw-semibold'>{formattedAnimal.identification_code}</span></p>
                        <h1 className="fw-semibold">{formattedAnimal.name}</h1>
                        <div className='mb-4'>
                            <button className="btn btn-primary rounded-pill px-4 py-2 mt-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Quiero Adoptarlo!</button>
                            <button className="btn btn-outline-primary rounded-pill py-2 mt-3 ms-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <i className="fa-regular fa-message me-2"></i>Contáctanos
                            </button>
                        </div>
                    </div>
                     
                     
                    <div class="modal fade text-center" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdrop1Label" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header bg-secondary">
									<h5 className="modal-title ">Información importante, lea con atención.</h5>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
								</div>
								<div className="modal-body">
                                <p> Contáctanos a través de WhatsApp al número 123456789 o por correo electrónico a elrefugio@, mencionando el nombre y número de referencia del peludito. De esta manera, comenzaremos a analizar tu petición y a iniciar el proceso de adopción.</p>
									<p className='f-5 fw-medium'>Los datos específicos de este peludito:</p>
									<div className="text-start f-5 fw-medium">
										<p>Nombre:{formattedAnimal.name}</p>
										<p>Numero de Referencia:{formattedAnimal.identification_code}</p>
									</div>
									<hr />
									<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none me-3">
										<i className="fa-brands fa-facebook"></i>
									</Link>
									<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none mx-3">
										<i className="fa-brands fa-instagram"></i>
									</Link>
								</div>
							</div>
						</div>
					</div>

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
									<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none me-3">
										<i className="fa-brands fa-facebook"></i>
									</Link>
									<Link to="" className="text-body-color fs-5 fw-medium text-decoration-none mx-3">
										<i className="fa-brands fa-instagram"></i>
									</Link>
								</div>
							</div>
						</div>
					</div>

                    <table className="table mb-3">
                        <tbody>
                            <tr>
                                <td className='text-neutral-60 col-5 col-lg-4'>ID</td>
                                <td className='text-neutral-60'>: {formattedAnimal.id}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Sexo</td>
                                <td className='text-neutral-60'>: {formattedAnimal.gender}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Edad</td>
                                <td className='text-neutral-60'>: {formattedAnimal.age}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Tamaño</td>
                                <td className='text-neutral-60'>: {formattedAnimal.size}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Vacunado</td>
                                <td className='text-neutral-60'>: {formattedAnimal.vaccinated}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Desparasitado</td>
                                <td className='text-neutral-60'>: {formattedAnimal.dewormed}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Microchip</td>
                                <td className='text-neutral-60'>: {formattedAnimal.microchip}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Castrado</td>
                                <td className='text-neutral-60'>: {formattedAnimal.castrated}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Fecha Nacimiento</td>
                                <td className='text-neutral-60'>: {formattedAnimal.birth_date}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Fecha Publicación</td>
                                <td className='text-neutral-60'>: {formattedAnimal.publication_date}</td>
                            </tr>
                            <tr>
                                <td className='text-neutral-60'>Información Adicional</td>
                                <td className='text-neutral-60'>: {formattedAnimal.additional_information}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}