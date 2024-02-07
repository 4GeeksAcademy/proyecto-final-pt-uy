import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className='my-5'>

      {/*About us*/}
      <div className='container'>
        <div className='mt-4 row'>
          <div className='col-lg-7'>
            <h5 className='fw-semibold'>Quienes somos</h5>
            <h1 className='fw-semibold'>Asociación <br /> El Refugio</h1>
            <p className='my-3'>
            En Asociación El Refugio, vivimos y respiramos por los animales. Nuestro equipo de voluntarios dedicados y apasionados trabaja incansablemente para asegurarse de que cada animal reciba el amor y la atención que se merece. Desde el momento en que llegan a nuestro refugio hasta el día en que encuentran un hogar amoroso, estamos comprometidos a proporcionarles todo lo que necesitan para vivir una vida feliz y saludable.
            </p>
            <p className='my-3'>
            Estamos orgullosos de ser una parte importante de este viaje, ayudando a transformar vidas y construyendo lazos indestructibles entre humanos y animales.
            </p>
            <p className='my-3'>
            Únete a nosotros en nuestra misión de hacer del mundo un lugar mejor para todos los seres vivos, un peludo a la vez.
            </p>
            {/*Buttons*/}
            <div>
              <button type="button" className="btn btn-outline-primary rounded-pill px-3 py-2 me-3 my-4" onClick={() => navigate("/recomendations")}>
                Más información
              </button>
              <button type="button" className="btn btn-secondary rounded-pill px-5 py-2 my-4">
                Donar
              </button>
            </div>
          </div>
          <div className='col-lg-5 d-flex mb-5'>
            <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706896617/Site/aboutUs_image.png"alt="About us image" className='img-fluid m-auto d-block' />
          </div>
        </div>
      </div>

      {/*Colaborate*/}
      <div className='bg-primary text-white'>
        <div className='container py-5'>
          <div className='row justify-content-center'>
            <div className='text-center col-md-8'>
              <p className='mb-1'>Cómo puedes colaborar</p>
              <h2 className='fw-semibold'>Sé parte de El Refugio</h2>
              <p>
              Juntos, podemos marcar la diferencia en la vida de los animales. Únete a nosotros y sé parte del cambio.
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 d-flex'>
              <h2 className='fs-0 me-2 opacity-50 fw-semibold'>1</h2>
              <div className='mt-4'>
                <h3 className='fw-semibold'>Voluntarios</h3>
                <p>
                Únete a nuestro equipo de voluntarios y contribuye directamente al cuidado y bienestar de los animales en nuestro refugio. Desde pasear perros y jugar con gatos hasta ayudar en eventos y campañas de concienciación, hay muchas maneras de involucrarte.
                </p>
              </div>
            </div>
            <div className='col-md-4 d-flex'>
              <h2 className='fs-0 me-2 opacity-50 fw-semibold'>2</h2>
              <div className='mt-4'>
                <h3 className='fw-semibold'>Padrinos</h3>
                <p>
                Conviértete en padrino de uno de nuestros animales y proporciona apoyo financiero continuo para cubrir sus necesidades básicas, incluyendo alimentación, atención veterinaria y refugio.
                </p>
              </div>
            </div>
            <div className='col-md-4 d-flex'>
              <h2 className='fs-0 me-2 opacity-50 fw-semibold'>3</h2>
              <div className='mt-4'>
                <h3 className='fw-semibold'>Socios</h3>
                <p>
                Únete a nuestro programa de socios y apoya nuestra misión a largo plazo para salvar vidas animales. Los socios desempeñan un papel crucial al proporcionar fondos estables y continuos para nuestros programas y servicios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Faqs*/}
      <div className='container my-5'>
        <div className='text-center mb-5'>
          <h2 className="fw-semibold mb-1">FAQ</h2>
          <p className="fw-semibold">Preguntas frecuentes sobre El Refugio</p>
        </div>

        {/*Acordion questions and answers*/}
        <div className='pb-3 mt-5'>
          <div className="accordion accordion-flush " id="accordionFlushExample">
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                ¿Cómo puedo adoptar un perro o un gato del refugio?
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Para adoptar un perro o un gato del refugio, te invitamos a explorar los perfiles de nuestros adorables animales en busca de tu compañero perfecto. Completa todos los datos necesarios en el perfil del animal en el que estés interesado, y estaremos encantados de contactarte para continuar con el proceso de adopción.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                ¿Cuál es el proceso de adopción?
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Una vez que hayas solicitado la adopción de un animal, nuestro equipo se pondrá en contacto contigo para seguir con los siguientes pasos del proceso de adopción. Estamos aquí para ayudarte en cada paso del camino.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                ¿Qué requisitos debo cumplir para adoptar un animal?
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                En principio, los requisitos iniciales son completar los datos necesarios en el perfil del animal que deseas adoptar. En una fase más avanzada del proceso de adopción, te proporcionaremos más información sobre los requisitos adicionales.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                ¿Los animales están vacunados y esterilizados antes de la adopción?
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                La información detallada sobre la vacunación y otros detalles importantes de cada animal se encuentra en la carta de presentación individual de cada uno de ellos.
                </p>
                <p className="accordion-body py-0">
                Te invitamos a revisar estos detalles en los perfiles de los animales que te interesen.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                ¿Ofrecen servicios de seguimiento después de la adopción?

                </button>
              </h2>
              <div id="flush-collapseFive" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Sí, después de cada adopción ofrecemos un servicio de seguimiento para asegurarnos de que el animal adoptado se encuentre en las mejores condiciones posibles. Nos preocupamos por el bienestar de nuestros animales y nos encantaría que compartieras tu experiencia con nosotros dejando un testimonio sobre tu proceso de adopción y cómo un hermoso animal ha cambiado tu vida.
                </p>
              </div>
            </div>

            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                ¿Puedo visitar el refugio para conocer a los animales antes de adoptar?
                </button>
              </h2>
              <div id="flush-collapseSix" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                ¡Por supuesto! Puedes visitar nuestro refugio dentro del horario de atención en el que estemos disponibles. Siempre habrá alguien esperando para ayudarte a continuar con el proceso de adopción y conocer a nuestros adorables animales.
                </p>
              </div>
            </div>

            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSix">
                ¿Cómo puedo hacer donaciones al refugio?
                </button>
              </h2>
              <div id="flush-collapseSeven" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                Actualmente, la opción para hacer donaciones al refugio aún no está disponible en nuestra página web. Sin embargo, apreciamos profundamente tu preocupación e intención de ayudar. 
                </p>
                <p className="accordion-body py-0">
                Estamos trabajando en habilitar esta función en el futuro y te invitamos a estar atento a las actualizaciones en nuestra página.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutUs;