import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import Select from './select.js';
import Input from "./input.js";
import DateInput from './dateInput.js';

import { useUserContext } from "../../contexts/userContext.js";
import { addAnimal } from '../../../client-API/backendAPI.js';

// Valores por defecto para los campos del form
const defaultValues = {
  name: "",
  type: "",
  gender: "",
  size: "",
  vaccinated: "",
  dewormed: "",
  castrated: "",
  microchip: "",
  status: "",
  birth_date: null,
  publication_date: new Date().toISOString().substring(0, 10),
  additional_information: "",
  images: [],
};

// Opciones de los selects
const typeOptions = [{ value: "dog", label: "Perro" }, { value: "cat", label: "Gato" }];
const genderOptions = [{ value: "male", label: "Macho" }, { value: "female", label: "Hembra" }];
const sizeOptions = [{ value: "small", label: "Pequeño" }, { value: "medium", label: "Mediano" }, { value: "large", label: "Grande" }, { value: "extra_large", label: "Extra grande" }];
const statusOptions = [{ value: "adopted", label: "Adoptado" }, { value: "not_adopted", label: "No adoptado" }, { value: "passed_away", label: "Fallecido" }];


const FormAddAnimal = () => {
  const navigate = useNavigate();

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { register, control, formState, handleSubmit, reset, watch, getValues } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const watchimages = watch("images");
  const filesArray = Array.from(watchimages);
  const filesURL = filesArray.map(file => URL.createObjectURL(file));

  const { store, actions } = useUserContext();

  const [addAnimalError, setAddAnimalError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newAnimal, setNewAnimal] = useState(null);


  useEffect(() => {
    // Si el formulario fue enviado exitosamente...
    if (isSubmitSuccessful && !addAnimalError && newAnimal) {
      // Mostrar el modal
      setShowSuccessModal(true);
      // Liberar los objetos URL creados para previsualizar las imagenes
      filesURL.forEach(fileURL => URL.revokeObjectURL(fileURL));
      // Resetear el form
      reset();
    }
  }, [isSubmitSuccessful, reset, newAnimal]);


  const onSubmit = async (data) => {
    setAddAnimalError("");
    const formData = new FormData();
    // Agregar datos del formulario
    Object.keys(data).forEach((key) => {
      if (data[key] !== "" && data[key] !== null) {
        if (key === 'images') {
          if (data.images.length > 0) {
            // Agregar cada archivo de imagen por separado
            Array.from(data[key]).forEach((image) => {
              formData.append(key, image);
            });
          }
        }
        else if (key.endsWith('_date')) {
          const isoDate = data[key].toISOString();
          formData.append(key, isoDate);
        }
        else {
          formData.append(key, data[key]);
        }
      }
    });

    // Realizar la solicitud al endpoint mediante el client-API
    try {
      const response = await addAnimal(formData, store.token);
      setNewAnimal(response);
    } catch (error) {
      console.error("Error on animal register: ", error);
      setAddAnimalError(error.message);
    }
  }


  return (
    <div>
      <h1 className='fs-4'>Ingresar Peludito</h1>
      <form className='bg-white rounded-1 shadow-sm p-3 p-md-4 pb-5' onSubmit={handleSubmit(onSubmit)} >

        {/* SECCIÓN DATOS */}
        <h2 className='fs-5 border-bottom border-neutral-10 pb-1'>Datos</h2>
        <div className='d-flex flex-column w-100 mb-5'>
          <div className='d-inline-flex flex-wrap column-gap-3 w-100'>

            {/* Nombre */}
            <Input
              size="big"
              id="name"
              label="Nombre"
              placeholder="Nombre del peludito"
              register={register}
              validationSchema={{ required: "El nombre es requerido" }}
              errors={errors}
            />

            <Select size='small' id="type" label="Tipo" options={typeOptions} register={register} validationSchema={{ required: "El tipo es requerido" }} errors={errors} />
            <Select size='small' id="gender" label="Sexo" options={genderOptions} register={register} errors={errors} />
            <Select size='small' id="size" label="Tamaño" options={sizeOptions} register={register} errors={errors} />
            <Select size='mini' id="vaccinated" label="Vacunado" register={register} errors={errors} />
            <Select size='mini' id="dewormed" label="Desparasitado" register={register} errors={errors} />
            <Select size='mini' id="castrated" label="Castrado" register={register} errors={errors} />
            <Select size='mini' id="microchip" label="Microchip" register={register} errors={errors} />
            <Select size='small' id="status" label="Estado" options={statusOptions} register={register} errors={errors} />

            <div className='d-inline-flex flex-wrap w-100 column-gap-3'>
              {/* Fechas */}
              <div className='d-flex flex-column' style={{ minWidth: "240px", maxWidth: "400px", flexGrow: 1 }}>
                <DateInput
                  id="birth_date"
                  label="Fecha de Nacimiento"
                  placeholder="Selecciona fecha"
                  register={register}
                  validationSchema={{ required: "La fecha de nacimiento es requerida. Puede ser estimada." }}
                  errors={errors}
                />

                <DateInput
                  id="publication_date"
                  label="Fecha de Publicación"
                  placeholder="Selecciona fecha"
                  register={register}
                  validationSchema={{ required: "La fecha de publicación es requerida." }}
                  errors={errors}
                />
              </div>

              {/* Info adicional */}
              <div className='d-flex h-100' style={{ minWidth: "300px", flexGrow: 2 }}>
                <div className="mb-3 table-item-big w-100 h-100">
                  <label htmlFor="additional_information" className="form-label">Información adicional</label>
                  <textarea
                    className="form-control"
                    style={{ minHeight: "140px" }}
                    id="additional_information"
                    placeholder='Ingresa si corresponde'
                    {...register("additional_information", { maxLength: { value: 400, message: "La información adicional no puede superar los 400 caracteres." } })}
                    errors={errors}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECCIÓN FOTOS */}
        <h2 className='fs-5 border-bottom border-neutral-10 pb-1'>Fotos</h2>
        <div className='d-inline-flex flex-wrap w-100 gap-3 mb-5'>
          {/* Input */}
          <div className='d-flex flex-column'>
            <label htmlFor='images' className="form-label">Selecciona hasta 5 fotos</label>
            <div className="mb-3 table-item-mini">
              <input
                type="file"
                className="form-control"
                id="images"
                accept="image/png, image/jpeg"
                multiple
                {...register("images", {
                  validate: (fieldValue) => {
                    return fieldValue.length < 6 || "Sólo puedes subir hasta 5 imágenes";
                  }
                })}
              />
              {/* TO-DO: gestionar la carga de modo que al seleccionar más imágenes éstas se agreguen en vez de sustituir a las anteriores */}
              <p className='fs-7 text-neutral-40 mb-1'>Formatos aceptados: .jpg o .png</p>
              <p className="fs-7 text-danger">{errors.images?.message}</p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className='d-inline-flex flex-wrap flex-grow-1 gap-2 align-items-center justify-content-center justify-content-md-start'>
            {
              filesURL.map((preview, index) => (
                <div key={index} className="d-flex justify-content-center overflow-hidden rounded-2 border border-3 border-white shadow-sm" style={{ maxWidth: "80px", height: "80px" }}>
                  <img className="d-flex w-100 object-fit-cover" src={preview} alt="preview" />
                  {/* TO-DO: implementar funcionalidad de eliminar la imagen */}
                </div>
              ))
            }
          </div>
        </div>

        { // Errores generados por validaciones del frontend
          Object.keys(errors).length > 0 &&
          (
            <div className="alert alert-danger mt-3" role="alert">
              Hay errores en el formulario. Por favor corrígelos y vuelve a intentar.
            </div>
          )
        }

        { // Errores generados por validaciones del backend
          addAnimalError !== "" &&
          (
            <div className="alert alert-danger mt-3" role="alert">
              Hay errores en el servidor. Por favor contacte al soporte técnico.
            </div>
          )
        }

        {/* Buttons */}
        <div className="d-flex gap-2 justify-content-end w-100">
          <button
            type='button'
            className='btn btn-outline-primary rounded-4 px-3 px-md-4'
            onClick={() => navigate('/table-animals')}
          >
            Cancelar
          </button>

          <button
            type='submit'
            className="btn btn-primary rounded-4 px-4 px-md-5"
            disabled={isSubmitting}
          >
            Registrar Peludito
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
        newAnimal &&
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: showSuccessModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registro exitoso</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowSuccessModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>{`¡${newAnimal.name} ha sido registrado/a exitosamente!`}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => navigate("/table-animals")}>Ver lista de peluditos</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => navigate(`/animal-profile:${newAnimal.id}`)}>{`Ver ficha de ${newAnimal.name}`}</button>
              </div>
            </div>
          </div>
        </div>
      }

      <DevTool control={control} />
    </div>
  )
}

export default FormAddAnimal;