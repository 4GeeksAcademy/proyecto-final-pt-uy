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

  let gender = animal?.gender === "male" ? "Macho" : "Hembra" || "sin datos";
  let vaccinated = animal?.vaccinated ? "Sí" : "No" || "sin datos";
  let dewormed = animal?.dewormed ? "Sí" : "No" || "sin datos";
  let microchip = animal?.microchip ? "Sí" : "No" || "sin datos";
  let castrated = animal?.castrated ? "Sí" : "No" || "sin datos";
  let additionalInfo = animal?.additional_information || "";
  let birthDate = animal?.birth_date?.substring(5,16) || "sin datos";
  let publicationDate = animal?.publication_date?.substring(5,16) || "sin datos";
  let age = calculateAge(animal) || "sin datos";
  let size = translateSize(animal) || "sin datos";



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


  function translateSize(animal) {
    let translatedSize = "";
    if ( animal && animal.size) {
      switch (animal.size) {
        case "small":
          translatedSize = "Pequeño";
          break;
        case "medium":
          translatedSize = "Mediano";
          break;
        default:
          translatedSize = "Grande"
          break;
      }
    }
    return translatedSize;
  }


  function calculateAge(animal) {
    let age = ""; 
    if (animal && animal.birth_date) {
      const birthDateObj = new Date(animal.birth_date);
      const timeDifference = Date.now() - birthDateObj.getTime();

      const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
      const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
      const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

      if (years > 1) {
          age = `${years} años`;
      } else if (years === 1) {
          age = "1 año";
      } else if (months > 1) {
          age = `${months} meses`;
      } else if (months === 1) {
          age = "1 mes";
      } else {
          age = `${weeks} sem.`;
      }
    }
    return age;
  }



  return (
    <div className='container'>
      {
        animal &&
        <div className='row animal border  rounded-5 outline-primary pt-3'>

          <div className='col animal-img'>
            <div className=' '>
              <Carousel imgUrlsArray={animal.image_urls} />
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

          <div className='col animal-data pb-3'>
            <div className='pe-5'>
              <p>Inicio {'>'} Peluditos {'>'} {animal.name}</p><br />
              <p className='mb-1'>ref. <span className='fw-semibold'>{animal.identification_code}</span></p>
              <h1 className="fw-semibold">{animal.name}</h1>
              <div className='mb-4'>
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