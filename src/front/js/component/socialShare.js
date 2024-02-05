import React from "react";

export default function SocialShare() {

    return (
        <div className='compartir text-center p-5 mt-4'>
            <p className='fw-semibold '>
                <i className="fa-solid fa-share-nodes fa-xl px-2"></i>
                Comparte:
                <i className="fa-brands fa-facebook fa-xl px-2" style={{ color: '#808080' }}></i>
                <i className="fa-brands fa-twitter fa-xl px-2" style={{ color: '#808080' }}></i>
                <i className="fa-brands fa-instagram fa-xl px-2" style={{ color: '#808080' }}></i>
                <i className="fa-brands fa-youtube fa-xl px-2" style={{ color: '#808080' }}></i>
            </p>
        </div>
    );
}