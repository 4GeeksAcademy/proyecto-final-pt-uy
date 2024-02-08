import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { useUserContext } from "../../contexts/userContext.js";
import { addAdoption } from '../../../client-API/backendAPI.js';

import Input from "./input.js";
import DateInput from './dateInput.js';

const FormAddAdoption = () => {
  const navigate = useNavigate();

  // Valores por defecto para los campos del form
  const defaultValues = {
    user_id: "",
    animal_id: "",
    registration_date: new Date().toISOString().substring(0, 10),
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { register, formState, handleSubmit, reset, watch, getValues } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const { store: {token} } = useUserContext();

  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newAdoption, setNewAdoption] = useState(false);


  useEffect(() => {
    // Si el formulario fue enviado exitosamente...
    if (isSubmitSuccessful && !errorMsg && newAdoption) {
      // Mostrar el modal
      setShowSuccessModal(true);
      // Resetear el form
      reset();
    }
  }, [isSubmitSuccessful, reset, newAdoption]);


  const onSubmit = async (data) => {
    setErrorMsg("");

    // Realizar la solicitud al endpoint mediante el client-API
    try {
      const response = await addAdoption(data.user_id, data.animal_id, data.registration_date, token);
      setNewAdoption(response);
    } catch (error) {
      console.error("Error on adoption register: ", error);
      setErrorMsg(error.message);
    }
  }


  return (
    <div>
      <h1 className='fs-4 fw-semibold'>Registrar Adopción</h1>
      <form className='bg-white rounded-1 shadow-sm p-3 p-md-4 pb-5' onSubmit={handleSubmit(onSubmit)} >

        {/* SECCIÓN DATOS */}
        <h2 className='fs-5 border-bottom border-neutral-10 pb-1 mb-3'>Datos requeridos</h2>
        <div className='d-flex flex-column w-100 mb-5'>
          <div className='d-inline-flex flex-wrap column-gap-3 w-100'>

            {/* User Id */}
            <Input
              size="small"
              id="user_id"
              label="ID de Usuario"
              placeholder="ID del usuario adoptante"
              register={register}
              validationSchema={{ required: "El ID del usuario es requerido" }}
              errors={errors}
            />

            {/* Animal Id */}
            <Input
              size="small"
              id="animal_id"
              label="ID del Peludito"
              placeholder="ID del peludito adoptado"
              register={register}
              validationSchema={{ required: "El ID del peludito es requerido" }}
              errors={errors}
            />

            {/* Fecha de registro */}
            <DateInput
                id="registration_date"
                label="Fecha"
                placeholder="Fecha en que se registró la adopción"
                register={register}
                validationSchema={{ required: "La fecha es requerida." }}
                errors={errors}
              />
          </div>
        </div>

        { // Errores generados por validaciones del frontend
          Object.keys(errors).length > 0 &&
            <div className="alert alert-danger mt-3" role="alert">
              Hay errores en el formulario. Por favor corrígelos y vuelve a intentar.
            </div>
        }

        { // Errores generados por validaciones del backend
          errorMsg !== "" &&
            <div className="alert alert-danger mt-3" role="alert">
              Hay errores en el servidor. Por favor contacte al soporte técnico.
            </div>
        }

        {/* Buttons */}
        <div className="d-flex gap-2 justify-content-end w-100">
          <button
            type='button'
            className='btn btn-outline-primary rounded-4 px-3 px-md-4'
            onClick={() => navigate('/table-adoptions')}
            disabled={isSubmitting}
          >
            Cancelar
          </button>

          <button
            type='submit'
            className="btn btn-secondary rounded-4 px-4 px-md-5"
            disabled={isSubmitting}
          >
            Registrar Adopción
          </button>

          {/* Spinner es renderizado mientras llega la respuesta del backend */}
          {isSubmitting && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </form>

      {/* Modal */}
      {
        newAdoption &&
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: showSuccessModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registro exitoso</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowSuccessModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>{`¡La adopción ha sido registrada exitosamente!`}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => navigate("/table-adoptions")}>Ver lista de adopciones</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowSuccessModal(false)}>Registrar otra adopción</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default FormAddAdoption;