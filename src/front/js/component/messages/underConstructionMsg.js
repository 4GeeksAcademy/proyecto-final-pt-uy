import React from "react";

export default function UnderConstructionMsg({message=""}) {
    return (
        <div className='d-flex flex-column w-100 align-items-center my-5'>
            <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4 floating' style={{ maxWidth: "200px" }}>
                <img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1707104468/Site/underconstruction_gvnfy4.png" />
            </figure>
            <h1 className="fs-3 fw-semibold text-center text-uppercase">En Construcción</h1>
            {
                !message &&
                <p className="text-center">
                    Alineando astros y píxeles <br/> para que más peluditos encuentren <br/>el hogar que los espera 
                    <i class="fa-solid fa-heart text-secondary ms-2"></i>
                </p>
            }

            {
                <p className='text-center'>{message}</p>
            }
        </div>
    );
}