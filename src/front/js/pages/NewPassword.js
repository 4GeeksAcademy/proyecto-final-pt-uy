import React from 'react';

import newPassword from "../../img/newPassword.jpg"
import logo from "../../img/el_refugio_logo.png";

const NewPassword = () => {
  return (
    <div className='d-flex flex-column-reverse flex-md-row-reverse min-vh-100'>
      {/* Form Panel */}
      <div className="d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel p-4">
        {/* Form Container */}
        <div className="d-flex flex-column w-100" style={{maxWidth: "470px"}}>

          {/* Logo */}
          <figure className='logo-container mb-4 mb-md-5'>
            <img src={logo} alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className='fw-bold lh-1 mb-2 mb-md-3'>Crear Nueva Contraseña</h1>

          {/* Form */}
          <form className='d-flex flex-column w-100'>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" placeholder='Ingresa tu contraseña' />
            </div>

            {/* Password */}
            <div className="mb-4 mb-md-5">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control mb-2" id="password" placeholder='Ingresa tu contraseña nuevamente' />
            </div>

            {/* Buttons */}
            <div className="row g-0 justify-content-end">
              <div className="col">
                <button type='button' className="btn btn-primary rounded-4 w-100">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Panel */}
      <div className="d-flex w-100 w-md-50 image-panel" style={{backgroundImage: `url(${newPassword})`}}></div>
    </div>
  )
}

export default NewPassword;