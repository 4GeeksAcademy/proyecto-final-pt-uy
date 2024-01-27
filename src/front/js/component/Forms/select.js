import React from "react";

const defaultOptions = [{ value: "yes", label: "Sí" }, { value: "no", label: "No" }];


export default function Select({ size = "med", id, label, options = defaultOptions, register, errors, validationSchema = {}, ...rest }) {

    return (
        <div className={`table-item-${size} flex-grow-1 mb-3`}>
            <label htmlFor={id} className="form-label">{label}</label>
            <select
                id={id}
                className="form-select rounded-4"
                {...register(id, validationSchema)}
            >
                <option value=""></option>
                {
                    options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)
                }
            </select>
            <p className="fs-7 text-danger">{errors[id]?.message}</p>
        </div>
    );
}