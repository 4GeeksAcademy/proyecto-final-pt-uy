import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAnimal } from '../../client-API/backendAPI';

import CardAnimal from '../component/cardAnimal';
import Carousel from '../component/carrousel';

import loadingImg from '../../img/loading.gif';
import errorImg from '../../img/error.png';
import notFoundImg from '../../img/notFound.png'


const AnimalProfile = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [animal, setAnimal] = useState(null);

  let gender = "sin datos";
  let age = "sin datos";
  let size = "sin datos";
  let vaccinated = "sin datos";
  let dewormed = "sin datos";
  let microchip = "sin datos";
  let castrated = "sin datos";
  let birthDate = "sin datos";
  let publicationDate = "sin datos";
  let additionalInfo = "";


  useEffect(() => {
    fetchAnimal();
  }, [])

  const fetchAnimal = async () => {
    setErrorMsg("");
    setIsLoading(true);

    try {
      const data = await getAnimal(id);
      setAnimal(data);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching animal details: `, error);
      setErrorMsg(error.message);
      setIsLoading(false);
    }
  }


  return (
    <div className='container'>
      {
        animal &&
        <div className='row animal border  rounded-5 outline-primary pt-3'>

          <div className='col animal-img'>
            <div className=' '>
              <Carousel img1={animal.image_urls[0]} img2={animal.image_urls[0]} img3={animal.image_urls[0]} img4={animal.image_urls[0]} img5={animal.image_urls[0]} />
            </div>
            <div className='compartir text-center  p-5'>
              <p className='fw-semibold '>
                <i className="fa-solid fa-share-nodes fa-xl px-2"></i>
                Comparte:
                <i className="fa-brands fa-facebook fa-xl px-2" style={{ color: '#808080' }}></i>
                <i className="fa-brands fa-twitter fa-xl px-2" style={{ color: '#808080' }}></i>
                <i className="fa-brands fa-instagram fa-xl px-2" style={{ color: '#808080' }}></i>
                <i className="fa-brands fa-youtube fa-xl px-2" style={{ color: '#808080' }}></i>
              </p>
            </div>
          </div>

          <div className='col animal-data '>
            <div className='pe-5'>
              <p>Inicio {'>'} Peluditos {'>'} {animal.name}</p><br />
              <p className='mb-1'>ref. <span className='fw-semibold'>{animal.identification_code}</span></p>
              <h1 className="fw-semibold">{animal.name}</h1>
              <div className='mb-3'>
                <button className="btn btn-primary rounded-pill px-4 py-2 mt-3">Quiero Adoptarlo!</button>
                <button className="btn btn-outline-primary rounded-pill  py-2 mt-3 ms-3"><i className="fa-regular fa-message me-2"></i>Contáctanos  </button>
              </div>
            </div>

            <table className="table mb-3">
              <tbody>
                <tr>
                  <td className='text-neutral-60 col-5 col-lg-4'>ID</td>
                  <td className='text-neutral-60'>: {animal.id}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Sexo</td>
                  <td className='text-neutral-60'>: {gender}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Edad</td>
                  <td className='text-neutral-60'>: {age}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Tamaño</td>
                  <td className='text-neutral-60'>: {size}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Vacunado</td>
                  <td className='text-neutral-60'>: {vaccinated}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Desparasitado</td>
                  <td className='text-neutral-60'>: {dewormed}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Microchip</td>
                  <td className='text-neutral-60'>: {microchip}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Castrado</td>
                  <td className='text-neutral-60'>: {castrated}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Fecha Nacimiento</td>
                  <td className='text-neutral-60'>: {birthDate}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Fecha Publicación</td>
                  <td className='text-neutral-60'>: {publicationDate}</td>
                </tr>
                <tr>
                  <td className='text-neutral-60'>Información Adicional</td>
                  <td className='text-neutral-60'>: {additionalInfo}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      }

      {
        animal &&
        <div className='row testimony'>
          {/* Testimonies */}
          <div className="my-5 container">
            {/*testimonies.length == 0 ?
            <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
            :
          */}
            <h2 className=" p-0 text-center">Testimonios</h2>
            <div className="px-2 grid gap-3 d-flex flex-row row-cols-2 scroll-bar" style={{ overflowX: "scroll" }} >

              {
                Array.from({ length: 12 }, (v, i) => i).map((card, index) => {
                  return (
                    <CardAnimal key={index} animal={animal} />
                  )
                })
              }
            </div>
          </div>

        </div>
      }

      {
        animal &&
        <div className='row related-animals mb-5'>
          <h2 className="p-0 text-center">Peluditos Similares</h2>
          {/* Listado de cards */}
          <div className="d-flex flex-nowrap overflow-auto justify-content-start gap-3 gap-lg-4">
            {/* Agregar la clase "flex-nowrap" y "overflow-auto" para evitar el ajuste automático */}
            {
              Array.from({ length: 5 }, (v, i) => i).map((card, index) => (
                <CardAnimal key={index} animal={animal} />
              ))
            }
          </div>
        </div>
      }


    </div>
  )
}

export default AnimalProfile;