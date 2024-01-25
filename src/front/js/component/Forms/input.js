import React from "react";

export default function Input({size="med", id, label, placeholder="", register, validationSchema={}, ...rest}) {

    return (
        <div className={`mb-3 table-item-${size} flex-grow-1`}>
              <label htmlFor={id} className="form-label">{label}</label>
              <input 
                type="text" 
                className="form-control" 
                id={id} 
                placeholder={placeholder} 
                {...register(id, validationSchema)} 
              />
        </div>
    );

}