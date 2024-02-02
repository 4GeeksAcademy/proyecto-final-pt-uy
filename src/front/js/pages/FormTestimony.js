import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormTestimony = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column flex-md-row min-vh-100'>
      {/* Form Panel */}
      <div className="d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel p-4  ">
        {/* Form Container */}
        <div className="d-flex flex-column align-items-center w-100 border pe-4 ps-4  rounded" style={{maxWidth: "470px"}}>

          {/* Logo */}
          <figure className='logo-container mt-3'>
            <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className='fw-bold lh-1 mb-2 mb-md-3'>Cuéntanos tu historia.</h1>
          <p className='fs-7 mb-4 mb-md-5'>¿Quieres adoptar? <span className="ps-1 fw-medium" onClick={() => navigate("/animal-list")}>Ellos te esperan!</span></p>

          {/* Form */}
          <form className='d-flex flex-column w-100'>
            {/* testimony */}
            <div className="mb-3">
              <label htmlFor="testimony" className="form-label">Tu Testimonio:</label>
              <textarea
            className="form-control"
            id="testimony"
            rows="4"
            placeholder='Cuentanos'
            required
          />
            </div>

            {/* image */}
            <div className="mb-4 mb-md-5">
            <label htmlFor="imageInput">Cargar Imagen:</label>
            <div className="custom-file d-inline ">
            <label className="custom-file-label btn btn-warning rounded-4 border " htmlFor="imageInput">
              Seleccionar Archivo
            </label>
            <input
              type="file"
              className="custom-file-input d-none"
              id="imageInput"
              accept="image/*"
            />
          </div>
            </div>

            {/* Buttons */}
            <div className="row g-0 justify-content-end mb-3">
              <div className="col me-2">
                <button type='button' className='btn btn-outline-primary rounded-4 w-100'>Cancelar</button>
              </div>
              <div className="col">
                <button type='button' className="btn btn-primary rounded-4 w-100">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default FormTestimony;