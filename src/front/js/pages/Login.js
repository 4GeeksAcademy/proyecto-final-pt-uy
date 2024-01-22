import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/home.css";
import loginImg from "../../img/login.jpg";
import logo from "../../img/el_refugio_logo.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column-reverse flex-md-row min-vh-100'>
      {/* Form Panel */}
      <div className="d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel">
        {/* Form Container */}
        <div className="d-flex flex-column w-100" style={{maxWidth: "470px"}}>

          {/* Logo */}
          <figure className='logo-container mb-5'>
            <img src={logo} alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className='fw-bold lh-1 mb-3'>Bienvenido <br />nuevamente!</h1>
          <p className='fs-7 mb-5'>¿No tienes un usuario? <span className="ps-1 fw-medium" onClick={() => navigate("/register")}>Regístrate</span></p>

          {/* Form */}
          <form className='d-flex flex-column w-100'>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder='Ingresa tu email' />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control mb-2" id="password" placeholder='Ingresa tu password' />
              <p className='text-end fs-7 fw-medium'>¿Olvidaste tu contraseña?</p>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end row gap-2">
              <button type='button' className='btn btn-outline-primary col-3 rounded-4'>Cancelar</button>
              <button type='button' className="btn btn-primary col-4 rounded-4">Login</button>
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