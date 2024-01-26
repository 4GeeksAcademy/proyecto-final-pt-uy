import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className='container bg-linear-0 my-5 p-5'>

      {/*Title: Perfil de Usuario*/}
      <h4 className='fw-semibold'>Perfil de Usuario</h4>
      <div className='col-4 col-sm-3 col-md-2 col-xxl-1'>
        <hr />
      </div>

      {/*Profile photo and userName*/}
      <div className='d-flex align-items-center my-5'>
        <div className='border_profile_img bg-white d-flex justify-content-center align-items-center shadow'>
          <figure className='circle_profile_img bg-secondary d-flex justify-content-center align-items-center fs-0-1 m-0'>
            U
          </figure>
        </div>
        <h5 className='ms-3 fw-medium my-0'>User_Name</h5>
      </div>

      <hr />

      {/*Personal information */}
      <form className='mt-2 mb-5'>
        <div className='d-flex flex-column flex-md-row'>
          <div className="mb-3 col-md-5 my-3">
            <label for="name" className="form-label fw-medium">Nombre</label>
            <input type="text" className="form-control bg-white" id="name" value={"poner valor del name del usuario que se traiga"} disabled />
          </div>
          <div className="mb-3 col-md-6 ms-md-auto my-3">
            <label for="lastname" className="form-label fw-medium">Apellidos</label>
            <input type="text" className="form-control bg-white" id="lastname" value={"poner valor del lastname del usuario que se traiga"} disabled />
          </div>
        </div>
        <div className="my-3">
          <label for="userName" className="form-label fw-medium">Nombre de Usuario</label>
          <input type="text" className="form-control bg-white" id="userName" value={"poner valor del userName del usuario que se traiga"} disabled />
        </div>
      </form>

      <hr />

      {/*Contact information*/}
      <form className='mb-2 mt-4'>
        <div className='d-flex flex-column flex-md-row'>
          <div className="mb-3 col-md-5">
            <label for="email" className="form-label fw-medium">Email</label>
            <div className='input-group mb-3'>
              <span className="input-group-text bg-white"><i className="fa-solid fa-envelope"></i></span>
              <input type="email" className="form-control bg-white" id="email" value={"poner valor del email del usuario que se traiga"} disabled />
            </div>
          </div>
          <div className="mb-3 col-md-6 ms-md-auto">
            <label for="phoneNumber" className="form-label fw-medium">Nímero de celular</label>
            <div className='input-group mb-3'>
              <span className="input-group-text bg-white"><i className="fa-solid fa-mobile"></i></span>
              <input type="number" className="form-control bg-white" id="phoneNumber" value={"00000"} disabled />
            </div>
          </div>
        </div>
      </form>

      <hr />

      {/*Other information */}
      <form className='my-5'>
        <div className="mb-3">
          <label for="address" className="form-label fw-medium">Dirección</label>
          <div className='input-group mb-3'>
            <span className="input-group-text bg-white"><i className="fa-sharp fa-solid fa-location-dot"></i></span>
            <input type="text" className="form-control bg-white" id="address" value={"poner valor de address del usuario que se traiga"} disabled />
          </div>
        </div>
        <div className='d-flex flex-column flex-md-row'>
          <div className="mb-3 col-md-5 my-3">
            <label for="name" className="form-label fw-medium">Patio</label>
            <div className='ms-3'>
              <div className="form-check form-check-inline me-5">
                <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-yes" value="yes" checked disabled />
                <label className="form-check-label opacity-100 ms-3" for="backyard-yes">Sí</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input opacity-100" type="radio" name="backyard-inlineRadioOptions" id="backyard-no" value="no" disabled />
                <label className="form-check-label opacity-100 ms-3" for="backyard-no">No</label>
              </div>
            </div>
          </div>
          <div className="mb-3 col-md-6 ms-md-auto my-3">
            <label for="name" className="form-label fw-medium">Mascotas</label>
            <div className='ms-3'>
              <div className="form-check form-check-inline me-5">
                <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-yes" value="yes" checked disabled />
                <label className="form-check-label opacity-100 ms-3" for="other_pets-yes">Sí</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input opacity-100" type="radio" name="other_pets-inlineRadioOptions" id="other_pets-no" value="no" disabled />
                <label className="form-check-label opacity-100 ms-3" for="other_pets-no">No</label>
              </div>
            </div>
          </div>
        </div>
      </form>

      <hr/>

      {/*Buttons*/}
      <div className='d-flex mt-5'>
        <button className='btn btn-outline-primary rounded-pill px-4 p-2 ms-auto me-3'>Cerrar sesión</button>
        <Link to="/edit-profile">
          <button className='btn btn-primary rounded-pill px-4 p-2'>Editar</button>
        </Link>
      </div>
    </div>
  )
}

export default Profile;