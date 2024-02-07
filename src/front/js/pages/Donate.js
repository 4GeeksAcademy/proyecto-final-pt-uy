import React from "react";

import UnderConstructionMsg from "../component/messages/underConstructionMsg"; 


export default function Donate() {
    return (
        <div className="container d-flex flex-column my-4 py-4">
            <h1 className="fs-3 fw-semibold text-center">Donaciones</h1>
            <UnderConstructionMsg />
        </div>
    )
}