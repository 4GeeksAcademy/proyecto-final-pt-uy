import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAnimal } from '../../client-API/backendAPI';

import CardAnimal from '../component/cardAnimal';
import AnimalDetail from '../component/animalDetail';

import loadingImg from '../../img/loading.gif';
import errorImg from '../../img/error.png';
import notFoundImg from '../../img/notFound.png'


const AnimalProfile = () => {
  const { id } = useParams();
  const [animalType, setAnimalType] = useState("");


  return (
    <div className='container'>
      <AnimalDetail id={id} />

      {
        // false &&
        // <div className='row testimony'>
        //   {/* Testimonies */}
        //   <div className="my-5 container">
        //     {/*testimonies.length == 0 ?
        //     <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        //     :
        //   */}
        //     <h2 className=" p-0 text-center">Testimonios</h2>
        //     <div className="px-2 grid gap-3 d-flex flex-row row-cols-2 scroll-bar" style={{ overflowX: "scroll" }} >

        //       {
        //         Array.from({ length: 12 }, (v, i) => i).map((card, index) => {
        //           return (
        //             <CardAnimal key={index} animal={animal} />
        //           )
        //         })
        //       }
        //     </div>
        //   </div>

        // </div>
      }

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