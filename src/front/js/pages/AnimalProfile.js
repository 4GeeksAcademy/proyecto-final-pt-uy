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
  imagen1:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/ad/7f/16/caption.jpg?w=1200&h=-1&s=1",
  imagen2:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/ad/7f/16/caption.jpg?w=1200&h=-1&s=1",
  imagen3:"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg",
  imagen4:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/ad/7f/16/caption.jpg?w=1200&h=-1&s=1",
  imagen5:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/ad/7f/16/caption.jpg?w=1200&h=-1&s=1",
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