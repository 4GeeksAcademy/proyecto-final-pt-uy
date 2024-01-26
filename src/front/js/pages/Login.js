import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import loginImg from "../../img/login.jpg";
import logo from "../../img/el_refugio_logo.png";
import Input from '../component/Forms/input';


const defaultValues = {
  email: "",
  password: ""
};

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset, control } = useForm({ defaultValues, mode: "onBlur" });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  
    const loginUrl = 'https://silver-space-carnival-q7qqq69g9x4j3479v-3001.app.github.dev/login';
  
    const credentials = {
      email: `${data.email}`,
      password: `${data.password}`
    };
  
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud de inicio de sesión');
        }
        return response.json();
      })
      .then(res => {
        console.log('Inicio de sesión exitoso:', res);
        // Aquí puedes manejar la respuesta del servidor después del inicio de sesión exitoso
      })
      .catch(error => {
        console.error('Error durante el inicio de sesión:', error);
        // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje al usuario
      });
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
          <h1 className='fw-bold lh-1 mb-2 mb-md-3'>Bienvenido <br />nuevamente!</h1>
          <p className='fs-7 mb-4 mb-md-5 text-neutral-60'>¿No tienes un usuario? <Link className="ps-1 fw-medium text-info text-decoration-none" to={"/register"}>Regístrate</Link></p>

          {/* Form */}
          <form className='d-flex flex-column w-100' onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
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

            {/* Password */}
            <div className="mb-4 mb-md-5">
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
              <p className='text-end fs-7 fw-medium text-info'><Link to={"/forgot-password"} className='fw-medium text-info text-decoration-none' >¿Olvidaste tu contraseña?</Link></p>
            </div>

            {/* Buttons */}
            <div className="row g-0 justify-content-end">
              <div className="col-4 col-md-3 me-2">
                <button type='button' className='btn btn-outline-primary rounded-4 w-100'>Cancelar</button>
              </div>
              <div className="col-5">
                <button type='submit' disabled={isSubmitting} className="btn btn-primary rounded-4 w-100">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Panel */}
      <div className="d-flex w-100 w-md-50 image-panel" style={{ backgroundImage: `url(${loginImg})` }}></div>
    </div>
  );
};

export default Login;
