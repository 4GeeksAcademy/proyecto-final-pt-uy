import React from "react";

export default function SocialShare() {

    return (
        <div className='compartir text-center p-5 mt-4'>
            <p className='fw-semibold '>
                <i className="fa-solid fa-share-nodes fa-xl px-2"></i>
                Comparte:
                <a href="https://www.facebook.com" target="_blank"><i className="fa-brands fa-facebook fa-xl px-2 text-neutral-40"></i></a>
                <a href="https://twitter.com" target="_blank"><i className="fa-brands fa-twitter fa-xl px-2 text-neutral-40"></i></a>
                <a href="https://www.instagram.com" target="_blank"><i className="fa-brands fa-instagram fa-xl px-2 text-neutral-40"></i></a>
                <a href="https://www.youtube.com" target="_blank"><i className="fa-brands fa-youtube fa-xl px-2 text-neutral-40"></i></a>
            </p>
        </div>
    );
}