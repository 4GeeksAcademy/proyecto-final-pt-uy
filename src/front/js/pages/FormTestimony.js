import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { useUserContext } from '../contexts/userContext.js';
import { addTestimony } from '../../client-API/backendAPI.js';


// Valores por defecto para los campos del form
const defaultValues = {
  testimony_text: "",
  image_file: null
};


const FormTestimony = () => {
  const navigate = useNavigate();
  const { adoptionId } = useParams(); // enviar como "adoption_id"

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { register, formState, handleSubmit, watch, getValues, reset } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const { store: { token } } = useUserContext();

  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);



  useEffect(() => {
    // Si el formulario fue enviado exitosamente...
    if (isSubmitSuccessful && !errorMsg && isRegistered) {
      // Mostrar el modal
      setShowSuccessModal(true);
      // Resetear el form
      reset();
      // Limpiar la vista previa de la imagen
      setImagePreview(null);
    }
  }, [isSubmitSuccessful, reset, isRegistered]);


  const onSubmit = async (data) => {
    setErrorMsg("");
    const formData = new FormData();

    // Agregar datos del formulario
    Object.keys(data).forEach((key) => {
      if (data[key] !== "" && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    formData.append("adoption_id", adoptionId);

    // Realizar la solicitud al endpoint mediante el client-API
    try {
      const response = await addTestimony(formData, token);
      if (response) {
        setIsRegistered(true);
      }
    } catch (error) {
      console.error("Error on testimony register: ", error);
      setErrorMsg(error.message);
    }
  }



  // Función para manejar el cambio de imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <div className='container d-flex justify-content-center align-items-start py-4' style={{ minHeight: "90vh" }}>

      {/* Form Container */}
      <div className="d-flex flex-column align-items-center w-100 border p-4 rounded-4" style={{ maxWidth: "470px" }}>

        {/* Logo */}
        <figure className='logo-container mt-3'>
          <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706900398/Site/el_refugio_logo.png" alt="Logo" />
        </figure>

        {/* Text */}
        <h1 className='fw-bold lh-1 mb-2 mb-md-3'>Cuéntanos tu historia.</h1>
        <p className='fs-7 mb-4 mb-md-5 text-center'>Comparte con los visitantes de nuestra web, tu experiencia con la adopción de un peludito de nuestro refugio.</p>

        {/* Form */}
        <form className='d-flex flex-column w-100' onSubmit={handleSubmit(onSubmit)} >
          {/* testimony */}
          <div className="mb-3">
            <label htmlFor="testimony" className="form-label fw-medium">Tu Testimonio:</label>
            <textarea
              className="form-control"
              id="testimony"
              rows="4"
              placeholder='Cuéntanos...'
              {...register("testimony_text", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                maxLength: {
                  value: 400,
                  message: "Se permiten hasta 400 caracteres.",
                },
              }
              )}
            />
            <p className="fs-7 text-danger">{errors.testimony_text?.message}</p>
          </div>

          {/* SECCIÓN FOTO */}
          <div className='d-inline-flex flex-wrap w-100 gap-3 mb-5'>
            {/* Input */}
            <div className='d-flex flex-column'>
              <label htmlFor='images' className="form-label fw-medium">Selecciona 1 foto:</label>
              <div className="mb-3 table-item-mini">
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  {...register("image_file")}
                />
                <p className='fs-7 text-neutral-40 mb-1'>Formatos aceptados: .jpg o .png</p>
                <p className="fs-7 text-danger">{errors.image_file?.message}</p>
              </div>
            </div>

            {/* Vista previa de la imagen */}
            {imagePreview && (
            <div className="d-flex justify-content-center overflow-hidden rounded-2 border border-3 border-white shadow-sm" style={{ maxWidth: "80px", height: "80px" }}>
              <img className="d-flex w-100 object-fit-cover" src={imagePreview} alt="preview" />
            </div>
            )}
          </div>

          {/* Buttons */}
          <div className="row g-0 justify-content-end mb-3">
            <div className="col me-2">
              <button type='button' className='btn btn-outline-primary rounded-4 w-100' onClick={() => navigate("/profile")}>Cancelar</button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-secondary rounded-4 w-100">{isSubmitting ? "Enviando..." : "Enviar"}</button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal */}
      {
        isRegistered &&
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: showSuccessModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registro exitoso</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => navigate("/profile")}></button>
              </div>
              <div className="modal-body">
                <p>{`¡Tu testimonio ha sido registrado exitosamente!`}</p>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default FormTestimony;