import React from 'react'
import { Link } from 'react-router-dom';
import "../../styles/home.css";
import SignUpImage from "../../img/SignUpImage.png";
import LogoImage from "../../img/Logo.png";

const Register = () => {
  return (
    <div className='container d-flex flex-column-reverse flex-md-row mb-3'>
      <div className='col-md-6'>
        <div className='formMargin'>
          <div>
            <img src={LogoImage} alt='SignUpImage' className='' />
          </div>
          <div className='mt-5 mb-3'>
            <h1 className="boldText">Registro de Usario</h1>
            <div className="d-flex flex-row mb-3">
              <p className="greyText pe-3">¿Ya tienes un usuario?</p>
              <Link to={"/login"} className="linkStyle">Ingresa</Link>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label for="name" className="form-label primaryText">Nombre</label>
              <input type="text" className="form-control py-2 px-4" id="name" placeholder="Ingresa tu nombre" />
            </div>
            <div className="mb-4">
              <label for="lastname" className="form-label primaryText">Apellidos</label>
              <input type="text" className="form-control py-2 px-4" id="lastname" placeholder="Ingresa tus apellidos" />
            </div>
            <div className="mb-4">
              <label for="userName" className="form-label">Nombre de Usuario</label>
              <input type="text" className="form-control py-2 px-4" id="userName" placeholder="Elige un nombre de usuario" />
            </div>
            <div className="mb-4">
              <label for="email" className="form-label">Email</label>
              <input type="email" className="form-control py-2 px-4" id="email" placeholder="Ingresa tu email" />
            </div>
            <div className="mb-4">
              <label for="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control py-2 px-4" id="password" placeholder="Ingresa tu contraseña" />
            </div>
            <div className='mb-4 d-flex'>
              <Link to={""} className="linkStyle ms-auto">¿Necesitas ayuda?</Link>
            </div>
            <div className='mb-4 d-flex'>
              <button type="button" class="btn btn-outline-darkBlue px-5 rounded-pill ms-auto">Cancelar</button>
              <button type="submit" class="btn btn-darkBlue px-5 rounded-pill ms-2">Registarme</button>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <img src={SignUpImage} alt='SignUpImage' className='image' />
      </div>
    </div>
  )
}

export default Register