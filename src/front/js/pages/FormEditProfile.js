import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../contexts/userContext';

import { getUser, modifyUser } from '../../client-API/backendAPI';

const FormEditProfile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const { store: { user, token }, actions } = useUserContext();
  
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: async () => {
      setErrorMsg("");
      setIsLoading(true);

      try {
        const data = await getUser(user.id, token);
        setIsLoading(false);
        setUserInfo(data);
        return {
          name: data.name,
          last_name: data.last_name,
          user_name: data.user_name,
          email: data.email,
          phone_number: data.phone_number,
          address: data.address,
          backyard: data.backyard,
          other_pets: data.other_pets,
        };
      } catch (error) {
        console.error(`Error fetching user by id: `, error);
        setErrorMsg(error.message);
        setIsLoading(false);
      }
    },
    mode: "onBlur"
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  const [editError, setEditError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEdited, setIsEdited] = useState(null);

  useEffect(() => {
    // If the form was successfully submitted
    if (isSubmitSuccessful && !editError && isEdited) {
      // Mostrar el modal
      setShowSuccessModal(true);
    }

  }, [isSubmitSuccessful, isEdited]);

  const onSubmit = async (data) => {
    setEditError("");

    const modifiedUser = {
      name: `${data.name}`,
      last_name: `${data.last_name}`,
      user_name: `${data.user_name}`,
      email: `${data.email}`,
      phone_number: `${data.phone_number}` || null,
      address: `${data.address}` || null,
      ...(data.backyard && {backyard: `${data.backyard}`}),
      ...(data.other_pets && {other_pets: `${data.other_pets}`}),
    };

    try {
      setIsEdited(await modifyUser(user.id, modifiedUser, token));
    } catch (error) {
      console.error("Error on register: ", error);
      setEditError(error.message);
    }
  };

  return (
    <div className='container bg-linear-0 my-5 p-5'>
      {/* While waiting for the backend response */}
      {console.log("user info",userInfo)}
      {
        isLoading &&
        <div className='d-flex flex-column w-100 align-items-center'>
          <figure className='d-flex justify-content-center overflow-hidden w-100' style={{ maxWidth: "250px" }}>
            <img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800965/Site/loading_mtemdl.gif" />
          </figure>
          <p className='fw-semibold'>Cargando...</p>
        </div>
      }

      {/* If an unexpected error occurred in the backend */}
      {
        !isLoading && errorMsg &&
        <div className='d-flex flex-column w-100 align-items-center'>
          <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "280px" }}>
            <img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800953/Site/error_pozpsi.png" />
          </figure>
          <p className='fw-semibold'>Lo sentimos, ha ocurrido un error inesperado.</p>
        </div>
      }

      {/* If an unexpected error occurred in the backend */}
      {
        !isLoading && !errorMsg && userInfo &&
        <div>
          {/*Title: Edición de Usuario*/}
          <h4 className='fw-semibold'>Edición de Usuario</h4>
          <div className='col-4 col-sm-3 col-md-2 col-xxl-1'>
            <hr />
          </div>

          {/*Profile photo and userName*/}
          <div className='d-flex align-items-center my-5'>
            <div className='border_profile_img bg-white d-flex justify-content-center align-items-center shadow'>
              <figure className='circle_profile_img bg-secondary d-flex justify-content-center align-items-center fs-0-1 m-0'>
                {userInfo?.user_name[0]}
              </figure>
            </div>
            <h5 className='ms-3 fw-medium my-0'>{userInfo?.user_name}</h5>
          </div>

          <hr />

          {/*Personal information */}
          <form className='mt-2 mb-5' onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='d-flex flex-column flex-md-row'>
              <div className="mb-3 col-md-5 my-3">
                <label htmlFor="name" className="form-label fw-medium">Nombre</label>
                <input type="text" className="form-control bg-white" id="name" {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre es obligatorio",
                  }
                })} />
                <p className='fs-7 text-danger mt-1'>{errors.name?.message}</p>
              </div>
              <div className="mb-3 col-md-6 ms-md-auto my-3">
                <label htmlFor="last_name" className="form-label fw-medium">Apellidos</label>
                <input type="text" className="form-control bg-white" id="last_name" {...register("last_name", {
                  required: {
                    value: true,
                    message: "El apellido es obligatorio",
                  }
                })} />
                <p className='fs-7 text-danger mt-1'>{errors.last_name?.message}</p>
              </div>
            </div>
            <div className="my-3">
              <label htmlFor="user_name" className="form-label fw-medium">Nombre de Usuario</label>
              <input type="text" className="form-control bg-white" id="user_name" {...register("user_name", {
                required: {
                  value: true,
                  message: "El nombre de usuario es obligatorio",
                }
              })} />
              <p className='fs-7 text-danger mt-1'>{errors.user_name?.message}</p>
            </div>

            <hr className='mb-5 mt-5' />

            {/*Contact information*/}
            <div className='d-flex flex-column flex-md-row'>
              <div className="col-md-5">
                <label htmlFor="email" className="form-label fw-medium">Email</label>
                <div className='input-group'>
                  <span className="input-group-text bg-white"><i className="fa-solid fa-envelope"></i></span>
                  <input type="email" className="form-control bg-white" id="email"  {...register("email", {
                    required: {
                      value: true,
                      message: "El email es obligatorio",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Formato de email inválido"
                    }
                  })} />
                </div>
                <p className='fs-7 text-danger mb-3'>{errors.email?.message}</p>
              </div>
              <div className="mb-3 col-md-6 ms-md-auto">
                <label htmlFor="phone_number" className="form-label fw-medium">Nímero de celular</label>
                <div className='input-group mb-3'>
                  <span className="input-group-text bg-white"><i className="fa-solid fa-mobile"></i></span>
                  <input type="tel" className="form-control bg-white" id="phone_number" {...register("phone_number")} />
                </div>
              </div>
            </div>

            <hr className='mb-5 mt-4' />

            {/*Other information */}
            <div>
              <label htmlFor="address" className="form-label fw-medium">Dirección</label>
              <div className='input-group mb-3'>
                <span className="input-group-text bg-white"><i className="fa-sharp fa-solid fa-location-dot"></i></span>
                <input type="text" className="form-control bg-white" id="address" {...register("address")} />
              </div>
            </div>

            <div className='d-flex flex-column flex-md-row'>
              <div className="mb-3 col-md-5 my-3">
                <label htmlFor="name" className="form-label fw-medium">Patio</label>
                <div className='ms-3'>
                  {userInfo?.backyard === "yes" ? (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-yes" value="yes" {...register("backyard")} checked />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-no" value="no" {...register("backyard")} />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-no">No</label>
                      </div>
                    </div>
                  ) : userInfo?.backyard === "no" ? (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-yes" value="yes" {...register("backyard")} />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-no" value="no" {...register("backyard")} checked />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-no">No</label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-yes" value="yes" {...register("backyard")} />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-no" value="no" {...register("backyard")} />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-no">No</label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3 col-md-6 ms-md-auto my-3">
                <label htmlFor="name" className="form-label fw-medium">Mascotas</label>
                <div className='ms-3'>
                  {userInfo?.other_pets === "yes" ? (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-yes" value="yes" {...register("other_pets")} checked />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-no" value="no" {...register("other_pets")} />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-no">No</label>
                      </div>
                    </div>
                  ) : userInfo?.other_pets === "no" ? (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-yes" value="yes" {...register("other_pets")} />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-no" value="no" {...register("other_pets")} checked />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-no">No</label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-yes" value="yes" {...register("other_pets")} />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-no" value="no" {...register("other_pets")} />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-no">No</label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            <hr className='mb-5 mt-4' />

            {/*Password */}
            <Link to="/new-password">
              <button type='button' className='btn btn-secondary rounded-pill px-4 py-2'>Cambiar contraseña</button>
            </Link>

            {/*Buttons*/}
            <div className='d-flex mt-5'>
              <Link to="/profile" className='ms-auto'>
                <button type='button' className='btn btn-outline-primary rounded-pill px-4 p-2 me-3' disabled={isSubmitting}>Salir</button>
              </Link>
              <button type='submit' className='btn btn-primary rounded-pill px-4 p-2' disabled={isSubmitting}>Guardar cambios</button>
              {/* Spinner es renderizado mientras llega la respuesta del backend */}
              {isSubmitting && (
                <div className="spinner-border text-primary ms-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>

          </form>
        </div>
      }

      {/* Modal */}
      {
        isEdited &&
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: showSuccessModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edición exitosa</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => navigate("/profile")}></button>
              </div>
              <div className="modal-body text-center">
                <h2 className='f-5 fw-medium'>¡Tus datos fueron modificados correctamente!</h2>
                <p>Ya podes ver tus datos actualizados en tu Perfil de Usario</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default FormEditProfile;