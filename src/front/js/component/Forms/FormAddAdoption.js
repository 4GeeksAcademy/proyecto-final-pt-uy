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


const FormAddAdoption = () => {
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


  // useEffect(() => {
  //   // Si el formulario fue enviado exitosamente...
  //   if (isSubmitSuccessful && !addAnimalError && newAnimal) {
  //     // Mostrar el modal
  //     setShowSuccessModal(true);
  //     // Liberar los objetos URL creados para previsualizar las imagenes
  //     filesURL.forEach(fileURL => URL.revokeObjectURL(fileURL));
  //     // Resetear el form
  //     reset();
  //   }
  // }, [isSubmitSuccessful, reset, newAnimal]);


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
      <h1>Registrar Adopción</h1>
      
    </div>
  )
}

export default FormAddAdoption;