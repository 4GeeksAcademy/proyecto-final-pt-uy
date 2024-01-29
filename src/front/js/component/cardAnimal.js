import React from "react";

export default function CardAnimal() {
    return (
        <div className="animal-card bg-white rounded-3 p-2">
            <figure className="rounded-3">
                <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706385647/jddpb30yh9c6wovx07jh.jpg"/>
            </figure>
            <p className="fw-semibold fs-5 mb-1">RD0023 Lola</p>

            <div className="d-flex flex-column flex-xl-row w-100 align-items-center mb-2">
                <p className="text-neutral-40 fs-7 text-center w-100 mb-0">Sexo: <span className="fw-semibold">Hembra</span></p>
                <p className="text-neutral-40 fs-7 text-center w-100 mb-0">Edad: <span className="fw-semibold">8 años</span></p>
            </div>

        </div>
    );
}