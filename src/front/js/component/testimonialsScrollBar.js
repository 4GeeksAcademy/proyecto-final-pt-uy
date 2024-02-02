import React from "react";

import CardTestimony from "./cardTestimony";


export default function TestimonialsScrollBar({ testimonialsList }) {
    return (
        <div className="p-2 grid gap-3 d-flex flex-row row-cols-2 scroll-bar" style={{ overflowX: "scroll" }} >
            {
                testimonialsList.map((testimony, index) => {
                    return (
                        <CardTestimony key={index} testimony={testimony} />
                    )
                })
            }
        </div>
    );
}