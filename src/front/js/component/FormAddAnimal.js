import React from 'react';

import Select from './select.js';

const FormAddAnimal = () => {
  return (
    <div>
      <h1 className='fs-4'>Ingresar Peludito</h1>

      <form className='bg-white rounded-1 shadow-sm p-4 pb-5'>
        {/* SECCIÓN DATOS */}
        <h2 className='fs-5 border-bottom border-neutral-10 pb-1'>Datos</h2>
        <div className='d-flex flex-column w-100'>
          <div className='d-inline-flex flex-wrap gap-3 w-100'>
            {/* Nombre */}
            <div className="mb-3 table-item-big flex-grow-1">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="name" placeholder='Nombre del peludito' />
            </div>

            <Select size='small' id={"type"} label={"Tipo"}></Select>
            <Select size='small' id={"sex"} label={"Sexo"}></Select>
            <Select size='small' id={"size"} label={"Tamaño"}></Select>
            <Select size='mini' id={"vaccinated"} label={"Vacunado"}></Select>
            <Select size='mini' id={"dewormed"} label={"Desparasitado"}></Select>
            <Select size='mini' id={"castrated"} label={"Castrado"}></Select>
            <Select size='mini' id={"microchip"} label={"Microchip"}></Select>
            <Select size='small' id={"status"} label={"Estado"}></Select>

            <div className='d-inline-flex flex-wrap w-100 gap-3'>
              {/* Fechas */}
              <div className='d-flex flex-column gap-3' style={{minWidth: "240px", maxWidth: "400px", flexGrow: 1}}>
                <div className="mb-3">
                  <label htmlFor="birthDate" className="form-label">Fecha de Nacimiento</label>
                  <input type="date" className="form-control" id="birthDate" placeholder='Selecciona fecha' />
                </div>

                <div className="mb-3">
                  <label htmlFor="publicationDate" className="form-label">Fecha de Publicación</label>
                  <input type="date" className="form-control" id="publicationDate" placeholder='Selecciona fecha' />
                </div>
              </div>
              
              {/* Info adicional */}
              <div className='d-flex h-100' style={{minWidth: "330px", flexGrow: 2}}>
                <div className="mb-3 table-item-big w-100 h-100">
                  <label htmlFor="additionalInfo" className="form-label">Información adicional</label>
                  <textarea className="form-control" id="additionalInfo" placeholder='Ingresa si corresponde' style={{minHeight: "140px"}}/>
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
                <input type="file" className="form-control" id="photos" placeholder='Nombre del peludito' />
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
          <button type='button' className="btn btn-primary rounded-4 px-4 px-md-5">Registrar Peludito</button>
        </div>
      </form>

    </div>
  )
}

export default FormAddAnimal;