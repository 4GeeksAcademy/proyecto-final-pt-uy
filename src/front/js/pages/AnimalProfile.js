import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAnimal } from '../../client-API/backendAPI';

import CardAnimal from '../component/cardAnimal';
import AnimalDetail from '../component/animalDetail';
import TestimonialsSection from '../component/testimonialsSection';

import loadingImg from '../../img/loading.gif';
import errorImg from '../../img/error.png';
import notFoundImg from '../../img/notFound.png'


const AnimalProfile = () => {
  const { id } = useParams();
  const [animalType, setAnimalType] = useState("");


  return (
    <div className='container'>
      <AnimalDetail id={id} />
      <TestimonialsSection />
      
      {
        // false &&
        // <div className='row related-animals mb-5'>
        //   <h2 className="p-0 text-center">Peluditos Similares</h2>
        //   {/* Listado de cards */}
        //   <div className="d-flex flex-nowrap overflow-auto justify-content-start gap-3 gap-lg-4">
        //     {/* Agregar la clase "flex-nowrap" y "overflow-auto" para evitar el ajuste automático */}
        //     {
        //       Array.from({ length: 5 }, (v, i) => i).map((card, index) => (
        //         <CardAnimal key={index} animal={animal} />
        //       ))
        //     }
        //   </div>
        // </div>
      }


    </div>
  )
}

export default AnimalProfile;