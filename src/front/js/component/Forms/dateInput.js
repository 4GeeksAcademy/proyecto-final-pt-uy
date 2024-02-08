import React from "react";

export default function DateInput({ id, label, placeholder = "", register, validationSchema = {}, errors, ...rest }) {

  return (
    <div className="mb-3 flex-grow-1">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type="date"
        className="form-control"
        id={id}
        placeholder={placeholder}
        {...register(id, { ...validationSchema, valueAsDate: true })}
      />
      <p className="fs-7 text-danger">{errors[id]?.message}</p>
    </div>
  );

}