import React from 'react';

const ForgotPassword = () => {

  return (
    <div className='d-flex flex-column-reverse flex-md-row min-vh-100'>
      {/* Form Panel */}
      <div className="d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel p-4">
        {/* Form Container */}
        <div className="d-flex flex-column w-100" style={{maxWidth: "470px"}}>

          {/* Logo */}
          <figure className='logo-container mb-4 mb-md-5'>
            <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className='fw-bold lh-1 mb-2 mb-md-3'>Olvidaste tu contraseña?</h1>
          <p className='fs-7 mb-4 mb-md-5'>Envia tu cuenta de email para restablecer la contraseña y crear una nueva.</p>

          {/* Form */}
          <form className='d-flex flex-column w-100'>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder='Ingresa tu email' />
            </div>
            

            {/* Buttons */}
            <div className="row g-0 justify-content-end">
              <div className="col me-2">
                <button type='button' className='btn btn-outline-primary rounded-4 w-100'>Volver</button>
              </div>
              <div className="col">
                <button type='button' className="btn btn-primary rounded-4 w-100">Recuperar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Panel */}
      <div className="d-flex w-100 w-md-50 image-panel" style={{backgroundImage: `url("https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900952/Site/forgotPassword.jpg")`}}></div>
    </div>
  )
}

export default ForgotPassword;