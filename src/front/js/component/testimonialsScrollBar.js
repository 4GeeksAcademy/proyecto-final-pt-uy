import React from "react";

import CardTestimony from "./cardTestimony";


export default function TestimonialsScrollBar({ testimonialsList }) {
    return (
        <div className="d-flex w-100 overflow-x-scroll gap-3 py-3 scroll-bar" >
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