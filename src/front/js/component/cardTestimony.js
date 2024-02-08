import React from "react";

export default function CardTestimony({testimony: {testimony_text, image_url, user_info, animal_info}}) {
    const userDisplayName = `${user_info.name} ${user_info.last_name.split("")[0]}.`;

    return (
        <div className="testimony-card rounded-3 shadow-sm" >
            <input type="checkbox" name="" />
            <div className="toggle">+</div>
            <figure className="imgBox">
                {/* Si el testimonio no tiene imagen, muestra la del animal adoptado */}git
                <img src={image_url || animal_info.image_urls[0]}/>
            </figure>
            <div className="details p-3 pt-4 vertical-scroll-bar scroll-bar" style={{ overflowY: "scroll", overflowX: "scroll" }}>
                <p>{testimony_text}</p>
                <p className="fs-7 fw-semibold text-end text-capitalize">{userDisplayName}</p>
            </div>
        </div>
    );
}