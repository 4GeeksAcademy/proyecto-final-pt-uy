import React from 'react';

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
      <form className='my-5'>
        <div className='d-flex flex-column flex-md-row'>
          <div class="mb-3 col-md-5">
            <label for="name" class="form-label fw-medium">Nombre</label>
            <input type="text" class="form-control bg-white" id="name" value={"poner valor del name del usuario que se traiga"} disabled />
          </div>
          <div class="mb-3 col-md-6 ms-md-auto">
            <label for="lastname" class="form-label fw-medium">Apellidos</label>
            <input type="text" class="form-control bg-white" id="lastname" value={"poner valor del lastname del usuario que se traiga"} disabled />
          </div>
        </div>
        <div class="mb-3">
          <label for="userName" class="form-label fw-medium">Nombre de Usuario</label>
          <input type="text" class="form-control bg-white" id="userName" value={"poner valor del userName del usuario que se traiga"} disabled />
        </div>
      </form>

      <hr />

      {/*Contact information*/}
      <form className='my-5'>
        <div className='d-flex flex-column flex-md-row'>
          <div class="mb-3 col-md-5">
            <label for="email" class="form-label fw-medium">Email</label>
            <div className='input-group mb-3'>
              <span class="input-group-text bg-white"><i class="fa-solid fa-envelope"></i></span>
              <input type="email" class="form-control bg-white" id="email" value={"poner valor del email del usuario que se traiga"} disabled />
            </div>
          </div>
          <div class="mb-3 col-md-6 ms-md-auto">
            <label for="phoneNumber" class="form-label fw-medium">Nímero de celular</label>
            <div className='input-group mb-3'>
              <span class="input-group-text bg-white"><i class="fa-solid fa-mobile"></i></span>
              <input type="number" class="form-control bg-white" id="phoneNumber" value={"00000"} disabled />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile;