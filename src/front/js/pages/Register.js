import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../component/Forms/input';
import { useForm } from 'react-hook-form';

import { registerUser } from '../../client-API/backendAPI';

import signUpImage from "../../img/signup.jpg";
import logo from "../../img/el_refugio_logo.png";


const defaultValues = {
  name: "",
  lastname: "",
  userName: "",
  email: "",
  password: ""
};


const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset, control } = useForm({ defaultValues, mode: "onBlur" });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const [registerError, setRegisterError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Si el formulario fue enviado exitosamente...
    if (isSubmitSuccessful && !registerError && isRegistered) {
      // Resetear el form
      reset();
      // Ir al login
      navigate("/login");
    }

  }, [isSubmitSuccessful, reset, isRegistered]);


  const onSubmit = async (data) => {
    setRegisterError("");
    console.log("Form submitted", data);

    const newUser = {
      name: `${data.name}`,
      last_name: `${data.lastname}`,
      username: `${data.userName}`,
      email: `${data.email}`,
      password: `${data.password}`
    };

    try {
      setIsRegistered(await registerUser(newUser));
    } catch (error) {
      console.error("Error on register: ", error);
      setRegisterError(error.message);
    }
  };


  return (
    <div className='d-flex flex-column-reverse flex-md-row min-vh-100'>
      {/* Form Panel */}
      <div className='d-flex flex-column justify-content-center align-items-center w-100 w-md-50 form-panel p-4'>
        {/* Form Container */}
        <div className="d-flex flex-column w-100" style={{ maxWidth: "470px" }}>

          {/* Logo */}
          <figure className='logo-container mb-4 mb-md-5'>
            <img src={logo} alt="Logo" />
          </figure>

          {/* Text */}
          <h1 className="fw-bold lh-1 mb-2 mb-md-3">Registro de Usario</h1>
          <p className='fs-7 mb-4 mb-md-5 text-neutral-60'>
            ¿Ya tienes un usuario?
            <Link className="ps-1 fw-medium text-info text-decoration-none" to={"/login"}>
              Ingresa
            </Link>
          </p>

          {/* Form */}
          <form className='d-flex flex-column w-100' onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-3">
              <Input
                size="big"
                id="name"
                type="text"
                label="Nombre"
                placeholder="Ingresa tu nombre"
                register={register}
                validationSchema={{ required: "El nombre es requerido" }}
                errors={errors}
              />
            </div>

            {/* Lastname */}
            <div className="mb-3">
              <Input
                size="big"
                id="lastname"
                type="text"
                label="Apellido"
                placeholder="Ingresa tu apellido"
                register={register}
                validationSchema={{ required: "El apellido es requerido" }}
                errors={errors}
              />
            </div>

            {/* UserName */}
            <div className="mb-3">
              <Input
                size="big"
                id="userName"
                type="text"
                label="Nombre de Usuario"
                placeholder="Elige un nombre de usuario"
                register={register}
                validationSchema={{
                  required: "Este campo es requerido", minLength: {
                    value: 5,
                    message: "El nombre de usuario debe tener al menos 5 caracteres",
                  },
                }}
                errors={errors}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <Input
                size="big"
                id="email"
                type="email"
                label="Correo Electrónico"
                placeholder="Ingresa tu correo electrónico"
                register={register}
                validationSchema={{
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Formato de correo electrónico no válido",
                  },
                }}
                errors={errors}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <Input
                size="big"
                id="password"
                type="password"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                register={register}
                validationSchema={{
                  required: "Este campo es requerido",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                }}
                errors={errors}
              />
            </div>

            <div className='mb-3 d-flex'>
              <Link to={""} className="fw-medium fs-7 text-info text-decoration-none ms-auto">¿Necesitas ayuda?</Link>
            </div>

            {/* Buttons */}
            <div className="row g-0 justify-content-end">
                <div className="col-4 col-md-3 me-2">
                  <button
                    type='button'
                    className='btn btn-outline-primary rounded-pill w-100'
                    onClick={() => { navigate("/") }}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                </div>

                <div className="col-5">
                  <button 
                    type='submit' 
                    className="btn btn-primary rounded-pill w-100"
                    disabled={isSubmitting}
                  >
                    Registarme
                  </button>
                </div>

                {/* Spinner es renderizado mientras llega la respuesta del backend */}
                {isSubmitting && (
                  <div className="spinner-border text-primary ms-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>

          </form>
        </div>
      </div>

      {/* Image Panel */}
      <div className="d-flex w-100 w-md-50 image-panel" style={{ backgroundImage: `url(${signUpImage})`, backgroundPosition: "center top" }}></div>
    </div>
  )
}

export default Register;