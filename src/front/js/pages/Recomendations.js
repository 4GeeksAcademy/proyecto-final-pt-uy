import React, { useRef } from 'react';

import { Link } from "react-router-dom";

const Recomendations = () => {
  const iframeRef = useRef(null);

	const handleCloseModal = () => {
		// Detener el video al cerrar el modal
		if (iframeRef.current) {
			const iframe = iframeRef.current;
			const videoSrc = iframe.src;
			iframe.src = videoSrc;
		}
	};

  return (
    <div className=''>
      <div>
        {/*Intro*/}
        <div className="mb-5" style={{ backgroundImage: `url("https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900069/Site/backgroundColors_image.png")`, backgroundPosition: "center top", backgroundSize: "cover" }}>
          <div className="container d-flex flex-column flex-lg-row pt-5">
            <div className="col-lg-6 mb-3">
              <h1 className="fw-light mb-0">Salvar Una Vida</h1>
              <h2 className="fw-semibold">Puede Cambiar La Tuya</h2>
              <p>
              En nuestro refugio, cada adopción es una oportunidad para hacer una diferencia. Al abrir tu corazón y hogar a un animal necesitado, no solo estás salvando una vida, sino también transformando la tuya. Descubre el amor incondicional que solo un compañero peludo puede brindar. ¡Adopta hoy y cambia dos vidas para siempre!"
              </p>
              <div className="">
              <button className="btn btn-outline-primary rounded-pill me-3 mt-3 px-4 py-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ver Intro <i className="fa-solid fa-play ms-2"></i></button>
                <Link to="/animal-list">
                  <button className="btn btn-primary rounded-pill px-4 py-2 mt-3">Encuentra tu amigo ideal</button>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <figure className="m-0">
                <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706903149/Site/recomendations-figure.png" alt="home image" className="img-fluid" />
              </figure>
            </div>
          </div>
        </div>

        <div class="modal fade text-center" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-body p-0">
							<div class="ratio text-center ratio-16x9">
								<iframe ref={iframeRef} class="embed-responsive-item ratio-16x9  " src="https://www.youtube.com/embed/X9QxvAaf_kY?si=cs1zI3kBonUNLeO0" ></iframe>
							</div>
						</div>
						<div className="modal-footer m-0 p-0">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>volver</button>
						</div>
					</div>
				</div>
			</div>


      </div>
      <div className='container '>
        <div className=' row '>
          <div className='text-center mt-5'>
            <h1 className="align-items-center">Adoptar una Mascota</h1>
            <h6 className="align-items-center">Preguntas frecuentes</h6>
          </div>
        </div>

        <div className='row my-5 mb-5' >

          <div className="accordion accordion-flush " id="accordionFlushExample">
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                ¿Cuánto tiempo y atención diaria necesitará la mascota en términos de cuidado y ejercicio?
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                El tiempo y la atención diaria necesarios varían según la especie y la edad de la mascota. Los perros, por ejemplo, generalmente requieren paseos diarios, tiempo de juego y atención, así como cuidados básicos como alimentación, limpieza y entrenamiento. Los gatos también necesitan tiempo de juego y atención, así como cuidados diarios como limpieza de la caja de arena y cepillado. 
                </p>
                <p className="accordion-body py-0">
                Es importante considerar si puedes comprometerte con el tiempo y la atención que requiere la mascota que estás considerando adoptar.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                ¿Qué debo hacer si mi mascota muestra signos de estrés o ansiedad?
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Si tu mascota muestra signos de estrés o ansiedad, es importante identificar la causa subyacente y abordarla adecuadamente. Proporciona un ambiente tranquilo y seguro para tu mascota, y considera hablar con un veterinario o un profesional de comportamiento animal para obtener orientación adicional.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                ¿Cuál es la expectativa de vida promedio de esta mascota y qué tipo de cuidados adicionales pueden ser necesarios a medida que envejece?
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                La expectativa de vida promedio varía según la especie, la raza y el tamaño de la mascota. Algunas razas de perros, por ejemplo, pueden tener una vida más larga que otras, y los gatos suelen vivir más tiempo que los perros. A medida que la mascota envejece, es posible que necesite cuidados adicionales como visitas veterinarias más frecuentes, cambios en la dieta y ajustes en el nivel de actividad. 
                </p>
                <p className="accordion-body py-0">
                Es importante estar preparado para proporcionar los cuidados necesarios a medida que la mascota envejece.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                ¿Cuál es la mejor manera de establecer una relación sólida y duradera con mi mascota?
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                La mejor manera de establecer una relación sólida y duradera con tu mascota es dedicar tiempo a construir un vínculo basado en la confianza y el respeto mutuo. Dedica tiempo a jugar, entrenar y pasar tiempo de calidad juntos.
                </p>
                <p className="accordion-body py-0">
                Escucha las necesidades de tu mascota y responde a ellas con amor y cuidado.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                ¿Cómo puedo garantizar que mi mascota esté feliz y saludable a lo largo de su vida?
                </button>
              </h2>
              <div id="flush-collapseFive" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Para garantizar la felicidad y la salud de tu mascota, es importante proporcionarle una dieta equilibrada, ejercicio regular, atención veterinaria preventiva y mucho amor y compañía. 
                </p>
                <p className="accordion-body py-0">
                Además, asegúrate de que tu mascota esté socializada y tenga estimulación mental adecuada.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                ¿Cómo puedo ayudar a mi mascota a adaptarse a su nuevo entorno?
                </button>
              </h2>
              <div id="flush-collapseSix" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Ayuda a tu mascota a adaptarse proporcionándole un espacio tranquilo y seguro en tu hogar. Introduce lentamente a tu mascota a su nuevo entorno y establece una rutina diaria consistente. 
                </p>
                <p className="accordion-body py-0">
                Proporciona mucho amor, atención y estímulo mental para ayudar a tu mascota a sentirse cómoda y segura.
                </p>
              </div>
            </div>
          </div>



        </div>
      </div>

      <img className=" w-100" src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706902909/Site/recomendations2.png" alt="Descripción de la imagen"></img>


      <div className='pt-5 mb-5 ' style={{ backgroundColor: '#FCEED5', backgroundPosition: "center top" }}>
        <div className='container'>

          <div className=' row '>
            <div className='text-center'>
              <h1 className="align-items-center">Mascotas con Necesidades Especiales</h1>
              <h6 className="align-items-center">Preguntas frecuentes</h6>
            </div>
          </div>

          <div className='row mt-5' >

            <div className="accordion accordion-flush bg-transparent" id="accordionFlushExample">
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid bg-transparent">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  ¿Cómo puedo cuidar adecuadamente a una mascota con discapacidad física o movilidad reducida?
                  </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                  Para cuidar a una mascota con discapacidad física, es importante proporcionar un ambiente seguro y adaptado. Esto puede incluir hacer modificaciones en el hogar para facilitar el movimiento, proporcionar juguetes y dispositivos adaptativos, y trabajar con un veterinario o un fisioterapeuta para desarrollar un plan de atención adecuado.
                  </p>
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  ¿Qué medidas de cuidado especial debo tomar para una mascota con necesidades médicas crónicas, como diabetes o enfermedades cardíacas?
                  </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                  Para una mascota con necesidades médicas crónicas, es importante seguir las recomendaciones de un veterinario en cuanto a medicación, dieta y cuidado diario. Esto puede incluir administrar medicamentos, monitorear los signos vitales y ajustar la dieta según sea necesario.
                  </p>          
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  ¿Cuáles son las mejores prácticas para cuidar a una mascota anciana y garantizar su comodidad y bienestar?
                  </button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                  Para cuidar a una mascota anciana, es importante proporcionar una dieta nutritiva y fácil de digerir, así como un ambiente cómodo y accesible. Además, es importante programar exámenes médicos regulares y prestar atención a cualquier cambio en el comportamiento o la salud de la mascota.
                  </p>
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  ¿Cómo puedo manejar el comportamiento ansioso o temeroso de una mascota rescatada con un historial traumático?
                  </button>
                </h2>
                <div id="flush-collapseFour" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                  Para manejar el comportamiento ansioso o temeroso de una mascota rescatada, es importante establecer rutinas consistentes, proporcionar un ambiente seguro y predecible, y trabajar con un entrenador o un especialista en comportamiento animal para desarrollar técnicas de manejo del estrés y la ansiedad.
                  </p>
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                  ¿Cuáles son las mejores prácticas para cuidar a una mascota con alergias o sensibilidades alimentarias?
                  </button>
                </h2>
                <div id="flush-collapseFive" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                  Para cuidar a una mascota con alergias o sensibilidades alimentarias, es importante identificar y evitar los alérgenos desencadenantes, así como proporcionar una dieta nutritiva y libre de alérgenos.
                  </p>
                  <p className="accordion-body py-0">
                  Trabajar con un veterinario para desarrollar un plan de manejo adecuado y realizar pruebas de alergia si es necesario.
                  </p>
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                  ¿Qué debo tener en cuenta al adoptar o cuidar a una mascota con necesidades especiales para garantizar su calidad de vida y felicidad?
                  </button>
                </h2>
                <div id="flush-collapseSix" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                  Al adoptar o cuidar a una mascota con necesidades especiales, es importante educarse sobre las necesidades específicas de la mascota y buscar el apoyo de profesionales como veterinarios, entrenadores y especialistas en comportamiento animal. 
                  </p>
                  <p className="accordion-body py-0">
                  Proporcionar un ambiente amoroso, seguro y adaptado es fundamental para garantizar su calidad de vida y felicidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className='container mt-5' >

        <div className=' row mt-5'>
          <div className='text-center'>
            <h1 className="align-items-center">Listado de Profesionales</h1>

          </div>
        </div>
        <div className='row mt-5' >

          <div className="accordion accordion-flush " id="accordionFlushExample">
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Veterinario general
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                 Para consultas de salud de rutina, vacunas, exámenes físicos y tratamientos básicos.
                </p> 
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Especialista en comportamiento animal
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Para problemas de comportamiento como ansiedad, agresividad, miedo, u otros desafíos de conducta.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Fisioterapeuta veterinario
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Para rehabilitación y terapia física en caso de lesiones, cirugías ortopédicas, o para mascotas con discapacidades físicas.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                Peluquería y estética canina
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Para servicios de peluquería, baño, corte de pelo, limpieza de uñas, y cuidado estético general para tu perro.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                Adiestrador canino
                </button>
              </h2>
              <div id="flush-collapseFive" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Para entrenamiento y educación en obediencia, socialización, comportamiento, y otras habilidades específicas para perros.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                Hotel canino
                </button>
              </h2>
              <div id="flush-collapseSix" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Para proporcionar cuidado de calidad cuando necesites dejar a tu mascota durante tus viajes o ausencias prolongadas. Los hoteles caninos ofrecen alojamiento, cuidado diario, y actividades recreativas para perros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img className=" w-100 mt-5" src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706903021/Site/recomendations3.png"></img>

    </div>
  )
}

export default Recomendations;