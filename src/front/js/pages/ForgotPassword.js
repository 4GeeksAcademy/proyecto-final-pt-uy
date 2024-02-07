import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';

import { forgotPassRequest } from '../../client-API/backendAPI';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset} = useForm({mode: "onBlur" });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    reset();

  }, [successMsg]);

  const onSubmit = async (data) => {
    setErrorMsg("");

    try {
      const response = await forgotPassRequest(data.email);
      setSuccessMsg(response.message);
    } catch (error) {
      console.error(`Error on forgot password request: `, error);
      setErrorMsg(error.message);
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
            <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className='fw-bold lh-1 mb-2 mb-md-3'>Olvidaste tu contraseña?</h1>
          <p className='fs-7 mb-4 mb-md-5'>Envía tu cuenta de email para restablecer la contraseña y crear una nueva.</p>

          { // Feedback para el usuario cuando la petición fue recibida
              successMsg !== "" &&
              <div className="alert alert-success mt-3" role="alert">{successMsg}</div>
          }

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

            { // Errores generados por validaciones del backend
              errorMsg !== "" &&
                <div className="alert alert-danger mt-3" role="alert">Ha surgido un error inesperado. Por favor contacta con soporte.</div>
            }

            {/* Buttons */}
            <div className="row g-0 justify-content-end">
              <div className="col me-2">
                <button 
                  type='button' 
                  className='btn btn-outline-primary rounded-4 w-100'
                  onClick={() => navigate("/login")}
                  disabled={isSubmitting}
                >
                  Volver
                </button>
              </div>
              <div className="col">
                <button type='submit' className="btn btn-primary rounded-4 w-100" disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar'}</button>
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