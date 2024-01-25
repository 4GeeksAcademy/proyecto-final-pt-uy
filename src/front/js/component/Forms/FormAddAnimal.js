import React, { useEffect } from 'react';

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import Select from './select.js';
import Input from "./input.js";
import DateInput from './dateInput.js';

// Valores por defecto para los campos del form
const defaultValues = {
  name: "",
  type: "",
  sex: "",
  size: "",
  vaccinated: "",
  dewormed: "",
  castrated: "",
  microchip: "",
  status: "",
  birthDate: null,
  publicationDate: new Date(),
  additionalInfo: "",
  photos: null,
};

// Opciones de los selects
const typeOptions = [{ value: "dog", label: "Perro" }, { value: "cat", label: "Gato" }];
const sexOptions = [{ value: "male", label: "Macho" }, { value: "female", label: "Hembra" }];
const sizeOptions = [{ value: "small", label: "Pequeño" }, { value: "medium", label: "Mediano" }, { value: "large", label: "Grande" }, { value: "extra_large", label: "Extra grande" }];
const statusOptions = [{ value: "adopted", label: "Adoptado" }, { value: "not_adopted", label: "No adoptado" }, { value: "passed_away", label: "Fallecido" }];


const FormAddAnimal = () => {

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { register, control, formState, handleSubmit, reset } = form;
  const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  useEffect(() => {
    // Resetear el formulario luego de que fue enviado exitosamente
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
    console.log("Form submited", data);
  };

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

            <Select size='small' id="type" label="Tipo" options={typeOptions} register={register} errors={errors} />
            <Select size='small' id="sex" label="Sexo" options={sexOptions} register={register} errors={errors} />
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
                  id="birthDate"
                  label="Fecha de Nacimiento"
                  placeholder="Selecciona fecha"
                  register={register}
                  validationSchema={{ required: "La fecha de nacimiento es requerida. Puede ser estimada." }}
                  errors={errors}
                />

                <DateInput
                  id="publicationDate"
                  label="Fecha de Publicación"
                  placeholder="Selecciona fecha"
                  register={register}
                  errors={errors}
                />
              </div>

              {/* Info adicional */}
              <div className='d-flex h-100' style={{ minWidth: "300px", flexGrow: 2 }}>
                <div className="mb-3 table-item-big w-100 h-100">
                  <label htmlFor="additionalInfo" className="form-label">Información adicional</label>
                  <textarea
                    className="form-control"
                    style={{ minHeight: "140px" }}
                    id="additionalInfo"
                    placeholder='Ingresa si corresponde'
                    {...register("additionalInfo", { maxLength: { value: 400, message: "La información adicional no puede superar los 400 caracteres." } })}
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
            <p className='fs-7 text-neutral-40 mb-1'>Formatos aceptados: .jpg o .png</p>

            <div className="mb-3 table-item-mini">
              <input
                type="file"
                className="form-control"
                id="photos"
                placeholder='Nombre del peludito'
                {...register("photos")}
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className='d-inline-flex flex-wrap flex-grow-1 gap-1 align-items-center justify-content-start'>
            {/* Aquí irían las miniaturas de las fotos seleccionadas */}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2 justify-content-end w-100">
          <button type='button' className='btn btn-outline-primary rounded-4 px-3 px-md-4'>Cancelar</button>
          <button type='submit' className="btn btn-primary rounded-4 px-4 px-md-5" disabled={isSubmitting}>Registrar Peludito</button>
        </div>
      </form>

      <DevTool control={control} />
    </div>
  )
}

export default FormAddAnimal;