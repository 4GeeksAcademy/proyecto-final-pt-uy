import React from 'react';

import aboutUs_image from "../../img/aboutUs_image.png"

const AboutUs = () => {
  return (
    <div className='my-5'>

      {/*About us*/}
      <div className='container'>
        <div className='mt-4 row'>
          <div className='col-lg-7'>
            <h5 className='fw-semibold'>Quienes somos</h5>
            <h1 className='fw-semibold'>Asociación <br /> El Refugio</h1>
            <p className='my-3'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus sit amet est placerat in egestas erat.
            </p>
            <p className='my-3'>
              Ultricies tristique nulla aliquet enim tortor. Nec ultrices dui sapien eget mi proin. Urna neque viverra justo nec ultrices dui. Velit dignissim sodales ut eu.
            </p>
            <p className='my-3'>
              Tellus rutrum tellus pellentesque eu tincidunt. Vulputate dignissim suspendisse in est ante in nibh.
            </p>
            {/*Buttons*/}
            <div>
              <button type="button" className="btn btn-outline-primary rounded-pill px-3 py-2 me-3 my-4">
                Más información
              </button>
              <button type="button" className="btn btn-secondary rounded-pill px-5 py-2 my-4">
                Donar
              </button>
            </div>
          </div>
          <div className='col-lg-5 d-flex mb-5'>
            <img src={aboutUs_image} alt="About us image" className='img-fluid m-auto d-block' />
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna neque viverra justo nec ultrices dui.
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 d-flex'>
              <h2 className='fs-0 me-2 opacity-50 fw-semibold'>1</h2>
              <div className='mt-4'>
                <h3 className='fw-semibold'>Voluntarios</h3>
                <p>
                  Cursus turpis massa tincidunt dui ut ornare lectus sit. Maecenas volutpat blandit aliquam etiam. Sapien eget mi proin sed libero enim sed. Et netus et malesuada fames.
                </p>
              </div>
            </div>
            <div className='col-md-4 d-flex'>
              <h2 className='fs-0 me-2 opacity-50 fw-semibold'>2</h2>
              <div className='mt-4'>
                <h3 className='fw-semibold'>Padrinos</h3>
                <p>
                  Cursus turpis massa tincidunt dui ut ornare lectus sit. Maecenas volutpat blandit aliquam etiam. Sapien eget mi proin sed libero enim sed. Et netus et malesuada fames.
                </p>
              </div>
            </div>
            <div className='col-md-4 d-flex'>
              <h2 className='fs-0 me-2 opacity-50 fw-semibold'>3</h2>
              <div className='mt-4'>
                <h3 className='fw-semibold'>Socios</h3>
                <p>
                  Cursus turpis massa tincidunt dui ut ornare lectus sit. Maecenas volutpat blandit aliquam etiam. Sapien eget mi proin sed libero enim sed. Et netus et malesuada fames.
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
          <div class="accordion accordion-flush " id="accordionFlushExample">
            <div class="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 class="accordion-header d-grid">
                <button class="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p class="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p class="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div class="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 class="accordion-header d-grid">
                <button class="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  ¿Non diam phasellus vestibulum lorem sed risus?
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p class="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p class="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div class="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 class="accordion-header d-grid">
                <button class="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  ¿Non diam phasellus vestibulum lorem sed risus?
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p class="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p class="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div class="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 class="accordion-header d-grid">
                <button class="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                </button>
              </h2>
              <div id="flush-collapseFour" class="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p class="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p class="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div class="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 class="accordion-header d-grid">
                <button class="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                  ¿Non diam phasellus vestibulum lorem sed risus?
                </button>
              </h2>
              <div id="flush-collapseFive" class="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p class="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p class="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
              </div>
            </div>
            <div class="accordion-item border border-0 border-start border-primary border-3 my-3">
              <h2 class="accordion-header d-grid">
                <button class="btn collapsed text-start py-0 ps-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                  ¿Cursus turpis massa tincidunt dui ut ornare lectus sit?
                </button>
              </h2>
              <div id="flush-collapseSix" class="accordion-collapse collapse text-neutral-80" data-bs-parent="#accordionFlushExample">
                <p class="accordion-body py-0 my-3">
                  Adipiscing at in tellus integer feugiat scelerisque varius. Enim ut tellus elementum sagittis vitae. Vulputate mi sit amet mauris commodo quis imperdiet massa. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
                </p>
                <p class="accordion-body py-0">
                  Augue interdum velit euismod in pellentesque massa placerat duis ultricies. At imperdiet dui accumsan sit amet nulla facilisi.
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