import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAnimal } from "../../client-API/backendAPI";

import AnimalDetail from '../component/animalDetail';
import TestimonialsSection from '../component/testimonialsSection';
import SimilarAnimalsSection from '../component/similarAnimalsSection';
import IsLoadingMsg from "../component/messages/isLoadingMsg";
import ErrorMsg from "../component/messages/errorMsg";
import NotFoundMsg from "../component/messages/notFoundMsg";


const AnimalProfile = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [animal, setAnimal] = useState(null);
  const [animalType, setAnimalType] = useState("");


  useEffect(() => {
    fetchAnimal();
    
	}, [id]);

  useEffect(() => {
    if(animal) {
      setAnimalType(animal.type)
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

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


  return (
    <div className='container d-flex flex-column mb-5'>
      {/* Mientras espera la respuesta del backend */}
      {isLoading && <IsLoadingMsg />}

      {/* Si se recibió un error de parte del backend */}
      {!isLoading && errorMsg && errorMsg !== "Peludito no encontrado" && <ErrorMsg />}

      {/* Si no está esperando respuesta, no recibió error y el animal no es null */}
      {!isLoading && !errorMsg && animal && <AnimalDetail key={id} animal={animal}/>}

      {/* Si no está esperando respuesta, no recibió error y el animal es null */}
      {!isLoading && errorMsg === "Peludito no encontrado" && <NotFoundMsg message={"Peludito no encontrado"} />}    

      <TestimonialsSection />

      {
        animalType &&
        <SimilarAnimalsSection key={id+1} animalType={animalType}/>
        
      }
    </div>
  )
}

export default AnimalProfile;