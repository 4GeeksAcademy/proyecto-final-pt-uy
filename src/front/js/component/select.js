import React from "react";

const defaultOptions = [
    {
        value: "1",
        label: "One"
    },
    {
        value: "2",
        label: "Two"
    }
];

export default function Select({size = "med", id, label, options = defaultOptions}) {

    return (
        <div className={`mb-3 table-item-${size} flex-grow-1 mb-3`}>
            <label htmlFor={id} class="form-label">{label}</label>
            <select id={id} className="form-select rounded-4">
            <option></option>
            {
                options.map((o) => <option value={o.value}>{o.label}</option>)
            }
            </select>
        </div>
    );
}