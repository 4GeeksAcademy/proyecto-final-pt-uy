import React from "react";

export default function Input({ type="text", size = "med", id, label, placeholder = "", register, validationSchema = {}, errors, ...rest }) {

    return (
        <div className={`mb-3 table-item-${size} flex-grow-1`}>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                id={id}
                placeholder={placeholder}
                {...register(id, validationSchema)}
            />
            <p className="fs-7 text-danger">{errors[id]?.message}</p>
        </div>
    );

}