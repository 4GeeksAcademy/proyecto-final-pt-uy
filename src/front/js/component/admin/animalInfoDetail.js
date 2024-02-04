import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { formatAnimalData } from "../../../utils/fromattingFunctions";

import Carousel from '../carrousel';


export default function AnimalInfoDetail({animal}) {
    const navigate = useNavigate();
    const formattedAnimal = formatAnimalData(animal);

    return (
        <div className='d-flex flex-column mb-4'>

            <div className='d-flex flex-column flex-lg-row gap-3 mb-4'>
                {/* Carousel */}
                <Carousel imgUrlsArray={formattedAnimal.image_urls} />

                {/* Table */}
                <table className="table mb-3">
                    <tbody>
                        <tr>
                            <td className='text-neutral-60 col-5 col-lg-4'>Referencia</td>
                            <td className='text-primary fw-semibold'>: {formattedAnimal.identification_code}</td>
                        </tr>
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

            {/* Buttons */}
            <div className='d-flex flex-wrap gap-2 justify-content-end'>
                <button 
                    className="btn btn-outline-primary rounded-pill px-4 py-2"
                    onClick={() => {navigate("/table-animals")}}
                >
                    Volver
                </button>

                <button 
                    className="btn btn-secondary rounded-pill px-5 py-2"
                    onClick={() => {}}
                >
                    Modificar
                </button>
            </div>
        </div>
    );
}