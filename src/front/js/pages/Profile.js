import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useUserContext } from '../contexts/userContext';

import { getUser } from '../../client-API/backendAPI';

const Profile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const { store: { user, token }, actions} = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();

  }, [])

  const fetchUser = async () => {
    setErrorMsg("");
    setIsLoading(true);

    try {
      const data = await getUser(user.id, token);
      setUserInfo(data);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching user by id: `, error);
      setErrorMsg(error.message);
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
		actions.setToken("");
		actions.setUser({
			id: "",
			name: "",
			role: ""
		});
		navigate("/login");
	}

  return (
    <div className='container bg-linear-0 my-5 p-5'>
      {console.log(userInfo)}
      {/* While waiting for the backend response */}
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

      {/* If it isn't waiting for an answer, didn't occurred any errors and the user is not null */}
      {
        !isLoading && !errorMsg && userInfo &&
        <div>
          {/*Title: Perfil de Usuario*/}
          <h4 className='fw-semibold'>Perfil de Usuario</h4>
          <div className='col-4 col-sm-3 col-md-2 col-xxl-1'>
            <hr />
          </div>

          {/*Profile photo and userName*/}
          <div className='d-flex align-items-center my-5'>
            <div className='border_profile_img bg-white d-flex justify-content-center align-items-center shadow'>
              <figure className='circle_profile_img bg-secondary d-flex justify-content-center align-items-center fs-0-1 m-0'>
                {userInfo?.name[0]}
              </figure>
            </div>
            <h5 className='ms-3 fw-medium my-0'>{userInfo?.user_name}</h5>
          </div>

          <hr />

          {/*Personal information */}
          <form className='mt-2 mb-5'>
            <div className='d-flex flex-column flex-md-row'>
              <div className="mb-3 col-md-5 my-3">
                <label htmlFor="name" className="form-label fw-medium">Nombre</label>
                <input type="text" className="form-control bg-white" id="name" value={userInfo?.name} disabled />
              </div>
              <div className="mb-3 col-md-6 ms-md-auto my-3">
                <label htmlFor="lastname" className="form-label fw-medium">Apellidos</label>
                <input type="text" className="form-control bg-white" id="lastname" value={userInfo?.last_name} disabled />
              </div>
            </div>
            <div className="my-3">
              <label htmlFor="userName" className="form-label fw-medium">Nombre de Usuario</label>
              <input type="text" className="form-control bg-white" id="userName" value={userInfo?.user_name} disabled />
            </div>
          </form>

          <hr />

          {/*Contact information*/}
          <form className='mb-2 mt-4'>
            <div className='d-flex flex-column flex-md-row'>
              <div className="mb-3 col-md-5">
                <label htmlFor="email" className="form-label fw-medium">Email</label>
                <div className='input-group mb-3'>
                  <span className="input-group-text bg-white"><i className="fa-solid fa-envelope"></i></span>
                  <input type="email" className="form-control bg-white" id="email" value={userInfo?.email} disabled />
                </div>
              </div>
              <div className="mb-3 col-md-6 ms-md-auto">
                <label htmlFor="phoneNumber" className="form-label fw-medium">Nímero de celular</label>
                <div className='input-group mb-3'>
                  <span className="input-group-text bg-white"><i className="fa-solid fa-mobile"></i></span>
                  <input type="tel" className="form-control bg-white" id="phoneNumber" value={userInfo?.phone_number} disabled />
                </div>
              </div>
            </div>
          </form>

          <hr />

          {/*Other information */}
          <form className='my-5'>
            <div className="mb-3">
              <label htmlFor="address" className="form-label fw-medium">Dirección</label>
              <div className='input-group mb-3'>
                <span className="input-group-text bg-white"><i className="fa-sharp fa-solid fa-location-dot"></i></span>
                <input type="text" className="form-control bg-white" id="address" value={userInfo?.address} disabled />
              </div>
            </div>

            <div className='d-flex flex-column flex-md-row'>
              <div className="mb-3 col-md-5 my-3">
                <label htmlFor="name" className="form-label fw-medium">Patio</label>
                <div className='ms-3'>
                  {userInfo?.backyard === "yes" ? (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-yes" value="yes" checked disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-no" value="no" disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-no">No</label>
                      </div>
                    </div>
                  ) : userInfo?.backyard === "no" ? (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-yes" value="yes" disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-no" value="no" checked disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-no">No</label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-yes" value="yes" disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="backyard-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-no" value="no" disabled />
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
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-yes" value="yes" checked disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-no" value="no" disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-no">No</label>
                      </div>
                    </div>
                  ) : userInfo?.other_pets === "no"? (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-yes" value="yes" disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-no" value="no" checked disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-no">No</label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="form-check form-check-inline me-5">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-yes" value="yes" disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-yes">Sí</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-no" value="no" disabled />
                        <label className="form-check-label opacity-100 ms-3" htmlFor="other_pets-no">No</label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>

          <hr />

          {/*Buttons*/}
          <div className='d-flex mt-5'>
            <button className='btn btn-outline-primary rounded-pill px-4 p-2 ms-auto me-3' onClick={handleLogout}>
              Cerrar sesión
            </button>
            <Link to="/edit-profile">
              <button className='btn btn-primary rounded-pill px-4 p-2'>Editar</button>
            </Link>
          </div>
        </div>
      }
    </div>
  )
}

export default Profile;