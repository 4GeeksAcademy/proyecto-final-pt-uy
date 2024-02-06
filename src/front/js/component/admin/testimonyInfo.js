import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { getUser} from "../../../client-API/backendAPI";

import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";
import UnderConstructionMsg from "../messages/underConstructionMsg";


export default function TestimonyInfo() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [user, setUser] = useState(null);


    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-end mb-3">
                {/* Title */}
                <h1 className='fs-4 fw-semibold m-0'>Ficha de Testimonio</h1>
            </div>
            <UnderConstructionMsg />
        </div>
    );
}