import React from 'react';



import recomenImgTwo from "../../img/recomendations 2.png";
import recomenImgThree from "../../img/recomendations 3.png";
import { Link } from "react-router-dom";

import backgrondColors_image from "../../img/backgroundColors_image.png"
import figure from "../../img/recomendations-figure.png"

const Recomendations = () => {
  return (
    <div className=''>
      <div>
        {/*Intro*/}
        <div className="mb-5" style={{ backgroundImage: `url(${backgrondColors_image})`, backgroundPosition: "center top" }}>
          <div className="container d-flex flex-column flex-lg-row pt-5">
            <div className="col-lg-6 mb-3">
              <h1 className="fw-light mb-0">Salvar Una Vida</h1>
              <h2 className="fw-semibold">Puede Cambiar La Tuya</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="">
                <button className="btn btn-outline-primary rounded-pill me-3 mt-3 px-4 py-2">Ver Intro <i class="fa-solid fa-play"></i></button>
                <Link to="/animal-list">
                  <button className="btn btn-primary rounded-pill px-4 py-2 mt-3">Encuentra tu amigo ideal</button>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <figure className="m-0">
                <img src={figure} alt="home image" className="img-fluid" />
              </figure>
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
                  ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  ¿Non diam phasellus vestibulum lorem sed risus?
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  ¿Non diam phasellus vestibulum lorem sed risus?
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                  ¿Non diam phasellus vestibulum lorem sed risus?
                </button>
              </h2>
              <div id="flush-collapseFive" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                  ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                </button>
              </h2>
              <div id="flush-collapseSix" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
          </div>



        </div>
      </div>

      <img className=" w-100" src={recomenImgTwo} alt="Descripción de la imagen"></img>


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
                    ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                  </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                    Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                  <p className="accordion-body py-0">
                    Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    ¿Non diam phasellus vestibulum lorem sed risus?
                  </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                    Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                  <p className="accordion-body py-0">
                    Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    ¿Non diam phasellus vestibulum lorem sed risus?
                  </button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                    Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                  <p className="accordion-body py-0">
                    Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                    ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                  </button>
                </h2>
                <div id="flush-collapseFour" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                    Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                  <p className="accordion-body py-0">
                    Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                    ¿Non diam phasellus vestibulum lorem sed risus?
                  </button>
                </h2>
                <div id="flush-collapseFive" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                    Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                  <p className="accordion-body py-0">
                    Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                </div>
              </div>
              <div className="accordion-item border border-0 border-start border-primary border-3 my-3 bg-transparent">
                <h2 className="accordion-header d-grid">
                  <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                    ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                  </button>
                </h2>
                <div id="flush-collapseSix" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                  <p className="accordion-body py-0 my-3">
                    Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                  </p>
                  <p className="accordion-body py-0">
                    Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
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
                  ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  ¿Non diam phasellus vestibulum lorem sed risus?
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  ¿Non diam phasellus vestibulum lorem sed risus?
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                  ¿Non diam phasellus vestibulum lorem sed risus?
                </button>
              </h2>
              <div id="flush-collapseFive" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div className="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 className="accordion-header d-grid">
                <button className="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                  ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                </button>
              </h2>
              <div id="flush-collapseSix" className="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p className="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p className="accordion-body py-0 mb-5">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img className=" w-100 mt-5" src={recomenImgThree}></img>

    </div>
  )
}

export default Recomendations;