import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import loginImg from "../../img/login.jpg";
import logo from "../../img/el_refugio_logo.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column-reverse flex-md-row min-vh-100'>
      {/* Form Panel */}
      <div className="d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel p-4">
        {/* Form Container */}
        <div className="d-flex flex-column w-100" style={{maxWidth: "470px"}}>

          {/* Logo */}
          <figure className='logo-container mb-4 mb-md-5'>
            <img src={logo} alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className='fw-bold lh-1 mb-2 mb-md-3'>Bienvenido <br />nuevamente!</h1>
          <p className='fs-7 mb-4 mb-md-5 text-neutral-60'>¿No tienes un usuario? <Link className="ps-1 fw-medium text-info text-decoration-none" to={"/register"}>Regístrate</Link></p>

          {/* Form */}
          <form className='d-flex flex-column w-100'>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder='Ingresa tu email' />
            </div>

            {/* Password */}
            <div className="mb-4 mb-md-5">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control mb-2" id="password" placeholder='Ingresa tu contraseña' />
              <p className='text-end fs-7 fw-medium text-info'><Link to={"/forgot-password"} className='fw-medium text-info text-decoration-none' >¿Olvidaste tu contraseña?</Link></p>
            </div>

            {/* Buttons */}
            <div className="row g-0 justify-content-end">
              <div className="col-4 col-md-3 me-2">
                <button type='button' className='btn btn-outline-primary rounded-4 w-100'>Cancelar</button>
              </div>
              <div className="col-5">
                <button type='button' className="btn btn-primary rounded-4 w-100">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Panel */}
      <div className="d-flex w-100 w-md-50 image-panel" style={{backgroundImage: `url(${loginImg})`}}></div>
    </div>
  )
}

export default Login;