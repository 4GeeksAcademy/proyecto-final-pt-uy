import React from 'react';

import CardAnimal from '../component/cardAnimal';
import Carousel from '../component/carrousel';


const animalDetails = {
  name:'Felix',
  identificationCode: "#9274928",
  sexo: "Macho",
  edad: "2 años",
  tamano: "Mediana",
  vacunado: "si",
  desparasitado: "Sí", 
  microchip: "Sí", 
  castrado: "Sí", 
  fechaNacimiento: "Tue, 12 Dec 2023 00:00:00 GMT",
  fechaPublicacion: "Tue, 01 Feb 2024 12:00:00 GMT",
  informacionAdicional: "Información adicional sobre el anima 34gg 4 g4gwgw wg w4gerth5 th te ",
  imagen1:"data:image/jpeg;base64,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",
  imagen2:"data:image/jpeg;base64,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",
  imagen3:"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg",
  imagen4:"",
  imagen5:"",
};


const AnimalProfile = () => {
  return (
    <div className='container'>

      <div className='row animal border  rounded-5 outline-primary pt-3'>

        <div className='col animal-img'>
          <div className=' '>
            <Carousel img1={animalDetails.imagen1} img2={animalDetails.imagen2} img3={animalDetails.imagen3} img4={animalDetails.imagen4} img5={animalDetails.imagen5}/>
          </div>
          <div className='compartir text-center  p-5'>
            <p className='fw-semibold '>
              <i class="fa-solid fa-share-nodes fa-xl px-2"></i>
              Comparte:
              <i className="fa-brands fa-facebook fa-xl px-2" style={{ color: '#808080' }}></i>
              <i class="fa-brands fa-twitter fa-xl px-2" style={{ color: '#808080' }}></i>
              <i class="fa-brands fa-instagram fa-xl px-2" style={{ color: '#808080' }}></i>
              <i class="fa-brands fa-youtube fa-xl px-2" style={{ color: '#808080' }}></i>
            </p>
          </div>
        </div>

        <div className='col animal-data '>
          <div className='pe-5'>
            <p>inicio {'>'} peluditos {'>'} {animalDetails.name}</p><br />
            <p className='mb-1'>ID #92427</p>
            <h1 className='color-primary primary'>{animalDetails.name}</h1>
            <div className=''>
              <button className="btn btn-primary rounded-pill px-4 py-2 mt-3">Quiero Adoptarlo!</button>
              <button className="btn btn-outline-primary rounded-pill  py-2 mt-3 ms-3"><i class="fa-regular fa-message me-2"></i>Contáctanos  </button>
            </div>
          </div>

          <table class="table mb-3">
            <tbody>
              <tr>
                <td>ID</td>
                <td>{animalDetails.identificationCode}</td>
              </tr>
              <tr>
                <td>Sexo</td>
                <td>{animalDetails.sexo}</td>
              </tr>
              <tr>
                <td>Edad</td>
                <td>{animalDetails.edad}</td>
              </tr>
              <tr>
                <td>Tamaenieo</td>
                <td>{animalDetails.tamano}</td>
              </tr>
              <tr>
                <td>Vacunado</td>
                <td>{animalDetails.vacunado}</td>
              </tr>
              <tr>
                <td>Desparasitado</td>
                <td>{animalDetails.desparasitado}</td>
              </tr>
              <tr>
                <td>Microchip</td>
                <td>{animalDetails.microchip}</td>
              </tr>
              <tr>
                <td>Castrado</td>
                <td>{animalDetails.castrado}</td>
              </tr>
              <tr>
                <td>Fecha Nacimiento</td>
                <td>{animalDetails.fechaNacimiento}</td>
              </tr>
              <tr>
                <td>Fecha Publicaion</td>
                <td>{animalDetails.fechaPublicacion}</td>
              </tr>
              <tr>
                <td>Informacion Adicional</td>
                <td>{animalDetails.informacionAdicional}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <div className='row testimony'>
      <h2 className=" p-0 text-center">Testimonios</h2>
      </div>


      <div className='row related-animals mb-5'>
        <h2 className=" p-0 text-center">Peluditos Similares</h2>
        {/* Listado de cards */}
        <div className="d-flex flex-wrap justify-content-center align-items-start gap-3 gap-lg-4">
          {
            Array.from({ length: 4 }, (v, i) => i).map((card, index) => {
              return (
                <CardAnimal key={index} animal={animalDetails} />
              )
            })
          }
        </div>
      </div>


    </div>
  )
}

export default AnimalProfile;