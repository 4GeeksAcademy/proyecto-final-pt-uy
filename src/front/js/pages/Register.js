import React from 'react'
import { Link } from 'react-router-dom';

import signUpImage from "../../img/signUp_image.png";
import logo from "../../img/el_refugio_logo.png";

const Register = () => {
  return (
    <div className='d-flex flex-column-reverse flex-md-row min-vh-100'>
      {/* Form Panel */}
      <div className='d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel p-4'>
        {/* Form Container */}
        <div className="d-flex flex-column w-100" style={{ maxWidth: "470px" }}>

          {/* Logo */}
          <figure className='logo-container mb-4 mb-md-5'>
            <img src={logo} alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className="fw-bold lh-1 mb-2 mb-md-3">Registro de Usario</h1>
          <div className="d-flex flex-row fs-7 mb-4 mb-md-4">
            <p className="greyText pe-2">¿Ya tienes un usuario?</p>
            <Link to={"/login"} className="linkStyle">Ingresa</Link>
          </div>

          {/* Form */}
          <form className='d-flex flex-column w-100'>
            {/* Name */}
            <div className="mb-3">
              <label for="name" className="form-label">Nombre</label>
              <input type="text" className="form-control py-2 px-4" id="name" placeholder="Ingresa tu nombre" />
            </div>

            {/* Lastname */}
            <div className="mb-3">
              <label for="lastname" className="form-label">Apellidos</label>
              <input type="text" className="form-control py-2 px-4" id="lastname" placeholder="Ingresa tus apellidos" />
            </div>

            {/* UserName */}
            <div className="mb-3">
              <label for="userName" className="form-label">Nombre de Usuario</label>
              <input type="text" className="form-control py-2 px-4" id="userName" placeholder="Elige un nombre de usuario" />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label for="email" className="form-label">Email</label>
              <input type="email" className="form-control py-2 px-4" id="email" placeholder="Ingresa tu email" />
            </div>

            {/* Password */}
            <div className="mb-4 mb-md-5">
              <label for="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control py-2 px-4" id="password" placeholder="Ingresa tu contraseña" />
            </div>

            <div className='mb-3 d-flex'>
              <Link to={""} className="linkStyle ms-auto">¿Necesitas ayuda?</Link>
            </div>

            {/* Buttons */}
            <div className="row g-0 justify-content-end">
              <div className="col-4 col-md-3 me-2">
                <button type='button' className='btn btn-outline-primary rounded-pill w-100'>Cancelar</button>
              </div>
              <div className="col-5">
                <button type='button' className="btn btn-primary rounded-pill w-100">Registarme</button>
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* Image Panel */}
      <div className="d-flex w-100 w-md-50 image-panel" style={{ backgroundImage: `url(${signUpImage})` }}></div>
    </div>
  )
}

export default Register;