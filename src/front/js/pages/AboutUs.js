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
    </div>
  )
}

export default AboutUs;