import React from "react";

export default function CardTestimony() {

    return (
        <div className="testimony-card rounded-3">
            <input type="checkbox" name="" />
            <div className="toggle">+</div>
            <figure className="imgBox">
                <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800508/Testimonials/testimonio7_bbc2yl.png"/>
            </figure>
            <div className="details p-3 pt-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc.</p>
                <p className="fs-7 fw-semibold text-end">María P.</p>
            </div>
        </div>
    );
}