import React from 'react';
import { useForm } from 'react-hook-form';

import forgot from "../../img/forgotPassword.jpg";
import logo from "../../img/el_refugio_logo.png";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://zany-robot-4j7776g9gg6qh7x4g-3001.app.github.dev/api/password-reset-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // Manejar la respuesta del servidor, que podría incluir un mensaje de éxito
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className='d-flex flex-column-reverse flex-md-row min-vh-100'>
      {/* Form Panel */}
      <div className="d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel p-4">
        {/* Form Container */}
        <div className="d-flex flex-column w-100" style={{ maxWidth: "470px" }}>

          {/* Logo */}
          <figure className='logo-container mb-4 mb-md-5'>
            <img src={logo} alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className='fw-bold lh-1 mb-2 mb-md-3'>Olvidaste tu contraseña?</h1>
          <p className='fs-7 mb-4 mb-md-5'>Envía tu cuenta de email para restablecer la contraseña y crear una nueva.</p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column w-100'>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                placeholder='Ingresa tu email'
                {...register('email', { required: 'Este campo es obligatorio' })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            {/* Buttons */}
            <div className="row g-0 justify-content-end">
              <div className="col me-2">
                <button type='button' className='btn btn-outline-primary rounded-4 w-100'>Volver</button>
              </div>
              <div className="col">
                <button type='submit' className="btn btn-primary rounded-4 w-100" disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Panel */}
      <div className="d-flex w-100 w-md-50 image-panel" style={{ backgroundImage: `url(${forgot})` }}></div>
    </div>
  )
}

export default ForgotPassword;