import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AnimalDetail from '../component/animalDetail';
import TestimonialsSection from '../component/testimonialsSection';
import SimilarAnimalsSection from '../component/similarAnimalsSection';

import loadingImg from '../../img/loading.gif';
import errorImg from '../../img/error.png';
import notFoundImg from '../../img/notFound.png'


const AnimalProfile = () => {
  const { id } = useParams();
  const [animalType, setAnimalType] = useState("");


  return (
    <div className='container d-flex flex-column mb-5'>
      <AnimalDetail id={id} setAnimalType={setAnimalType} />
      <TestimonialsSection />
      {
        animalType &&
        <SimilarAnimalsSection animalType={animalType}/>
        
      }
    </div>
  )
}

export default AnimalProfile;