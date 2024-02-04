import React, {useState, useEffect} from "react";

import { getAnimal } from "../../client-API/backendAPI";
import { formatAnimalData } from "../../utils/fromattingFunctions";

import Carousel from './carrousel';
import IsLoadingMsg from "./messages/isLoadingMsg";
import ErrorMsg from "./messages/errorMsg";
import NotFoundMsg from "./messages/notFoundMsg";



export default function AnimalDetail({id, setAnimalType}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [animal, setAnimal] = useState(null);
  
  let formattedAnimal = null;

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
    if (animal) {
      formattedAnimal = formatAnimalData(animal);
    }
        
	}, []);

  useEffect(() => {
      if(animal) {
          setAnimalType(animal.type);
          formattedAnimal = formatAnimalData(animal);
      }
  }, [animal]);


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
        <div className="container d-flex mb-5">
            {/* Mientras espera la respuesta del backend */}
            {isLoading && <IsLoadingMsg />}

            {/* Si se recibió un error de parte del backend */}
            {!isLoading && errorMsg && <ErrorMsg />}

            {/* Si no está esperando respuesta, no recibió error y el animal no es null */}
            {
                !isLoading && !errorMsg && animal &&
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

            {/* Si no está esperando respuesta, no recibió error y el animal es null */}
            {!isLoading && !errorMsg && !animal && <NotFoundMsg />}    
		    </div>
    );
}