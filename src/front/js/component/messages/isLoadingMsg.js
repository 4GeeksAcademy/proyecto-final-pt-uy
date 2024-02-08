import React from "react";


export default function IsLoadingMsg() {
    return (
        <div className='d-flex flex-column w-100 align-items-center align-self-center'>
            <figure className='d-flex justify-content-center overflow-hidden w-100' style={{ maxWidth: "250px" }}>
                <img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800965/Site/loading_mtemdl.gif" />
            </figure>
            <p className='fw-semibold'>Cargando...</p>
        </div>
    );
}