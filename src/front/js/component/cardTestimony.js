import React from "react";

export default function CardTestimony({testimony: {testimony_text, image_url, user_info}}) {
    const userDisplayName = `${user_info.name} ${user_info.last_name.split("")[0]}.`;

    return (
        <div className="testimony-card rounded-3">
            <input type="checkbox" name="" />
            <div className="toggle">+</div>
            <figure className="imgBox">
                <img src={image_url}/>
            </figure>
            <div className="details p-3 pt-4">
                <p>{testimony_text}</p>
                <p className="fs-7 fw-semibold text-end text-capitalize">{userDisplayName}</p>
            </div>
        </div>
    );
}