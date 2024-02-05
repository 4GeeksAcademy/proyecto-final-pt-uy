import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import newPassword from "../../img/newPassword.jpg";
import logo from "../../img/el_refugio_logo.png";

const NewPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();

  // Obtén el token JWT de la URL al cargar el componente
  const urlParams = new URLSearchParams(window.location.search);
  const authTokenFromURL = urlParams.get('token');

  const onSubmit = async (data) => {
    try {
      // Realiza la solicitud al backend con el token obtenido de la URL
      const response = await fetch('https://zany-robot-4j7776g9gg6qh7x4g-3001.app.github.dev/password-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokenFromURL}`
        },
        body: JSON.stringify({
          password: data.password
        })
      });

      // Verifica si la solicitud fue exitosa
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // Maneja la respuesta del servidor

      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  return (
    <div className='d-flex flex-column-reverse flex-md-row-reverse min-vh-100'>
      {/* Form Panel */}
      <div className="d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel p-4">
        {/* Form Container */}
        <div className="d-flex flex-column w-100" style={{ maxWidth: "470px" }}>
          {/* Logo */}
          <figure className='logo-container mb-4 mb-md-5'>
            <img src={logo} alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className='fw-bold lh-1 mb-2 mb-md-3'>Crear Nueva Contraseña</h1>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column w-100'>
            {/* Contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                placeholder='Ingresa tu contraseña'
                {...register('password', { required: 'Este campo es obligatorio' })}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            {/* Confirmar Contraseña */}
            <div className="mb-4 mb-md-5">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                id="confirmPassword"
                placeholder='Ingresa tu contraseña nuevamente'
                {...register('confirmPassword', {
                  required: 'Este campo es obligatorio',
                  validate: value => value === watch('password') || 'Las contraseñas no coinciden',

                })}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
            </div>

            {/* Botones */}
            <div className="row g-0 justify-content-end">
              <div className="col">
              <button type='submit' className="btn btn-primary rounded-4 w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Panel */}
      <div className="d-flex w-100 w-md-50 image-panel" style={{ backgroundImage: `url(${newPassword})` }}></div>
    </div>
  );
};

export default NewPassword;
