import React from "react";

import { formatAnimalData } from "../../utils/fromattingFunctions";

import Carousel from './carrousel';
import SocialShare from "./socialShare";


export default function AnimalDetail({animal}) {
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
                      <button className="btn btn-primary rounded-pill px-4 py-2 mt-3">Quiero Adoptarlo!</button>
                      <button className="btn btn-outline-primary rounded-pill  py-2 mt-3 ms-3"><i className="fa-regular fa-message me-2"></i>Contáctanos  </button>
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