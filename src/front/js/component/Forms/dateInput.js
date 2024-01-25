import React from "react";

export default function DateInput({id, label, placeholder="", register, validationSchema={}, ...rest}) {

    return (
        <div className="mb-3">
          <label htmlFor={id} className="form-label">{label}</label>
          <input 
            type="date" 
            className="form-control" 
            id={id} 
            placeholder={placeholder}
            {...register(id, {...validationSchema, valueAsDate: true})}
          />
        </div>
    );

}