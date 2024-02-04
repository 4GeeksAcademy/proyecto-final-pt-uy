import React from "react";

export default function NotFoundMsg({message="No encontramos peluditos"}) {
    return (
        <div className='d-flex flex-column w-100 align-items-center my-4'>
            <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "200px" }}>
                <img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800999/Site/notFound_a0yxua.png" />
            </figure>
            <p className='fw-semibold text-center'>{message}</p>
        </div>
    );
}