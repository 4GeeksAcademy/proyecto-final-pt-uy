import React, {useState, useEffect} from 'react';
import { set, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { updatePassRequest } from '../../client-API/backendAPI';


const NewPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset, watch } = useForm({mode: "onBlur" });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  // Obtener el token JWT de la URL al cargar el componente
  const urlParams = new URLSearchParams(window.location.search);
  const authTokenFromURL = urlParams.get('token');

  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [passIsChanged, setPassIsChanged] = useState(false);


  useEffect(() => {
    setShowSuccessModal(true);
    reset();

  }, [passIsChanged]);


  const onSubmit = async (data) => {
      setErrorMsg("");

      try {
        const response = await updatePassRequest(data.password, authTokenFromURL);
        if (response) {
          setPassIsChanged(true);
        }

      } catch (error) {
        console.error(`Error on forgot password request: `, error);
        setErrorMsg(error.message);
      }
  };


  return (
    <div className='d-flex flex-column-reverse flex-md-row-reverse min-vh-100'>
      {/* Form Panel */}
      <div className="d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel p-4">
        {/* Form Container */}
        <div className="d-flex flex-column w-100" style={{ maxWidth: "470px" }}>
          {/* Logo */}
          <Link to="/" className='logo-container mb-4 mb-md-5'>
            <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
          </Link>

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
                {...register('password', {
                  required: 'Este campo es obligatorio',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres',
                  },
                })}
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

            { // Errores generados por validaciones del backend
              errorMsg !== "" &&
                <div className="alert alert-danger mt-3" role="alert">Ha surgido un error inesperado. Por favor contacta con soporte.</div>
            }

            {/* Botón */}
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


      <div className="d-flex w-100 w-md-50 image-panel" style={{ backgroundImage: `url("https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800993/Site/newPassword_myqrd1.jpg")` }}></div>

      {/* Modal */}
      {
        passIsChanged &&
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: showSuccessModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registro exitoso</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => navigate("/login")}></button>
              </div>
              <div className="modal-body">
                <h2 className='f-5 fw-medium'>¡Felicidades!🥳</h2>
                <p>Tu nueva contraseña se ha guardado y ya puedes loguearte.</p>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default NewPassword;
