import React from "react";

export default function ErrorMsg() {
    return (
        <div className='d-flex flex-column w-100 align-items-center'>
            <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "280px" }}>
                <img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800953/Site/error_pozpsi.png" />
            </figure>
            <p className='fw-semibold'>Lo sentimos, ha ocurrido un error inesperado.</p>
        </div>
    );
}