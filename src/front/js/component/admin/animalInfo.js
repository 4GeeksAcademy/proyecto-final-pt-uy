import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { getAnimal } from "../../../client-API/backendAPI";

import AnimalInfoDetail from "./animalInfoDetail";
import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";


export default function AnimalInfo() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        fetchAnimal();
        
    }, []);


    const fetchAnimal = async () => {
        setErrorMsg("");
        setIsLoading(true);
    
        try {
        const data = await getAnimal(id);
        setAnimal(data);
        setIsLoading(false);
        } catch (error) {
        console.error(`Error fetching animal details: `, error);
        setErrorMsg(error.message);
        setIsLoading(false);
        }
    }


    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-end mb-3">
                {/* Title */}
                <h1 className='fs-4 fw-semibold m-0'>{animal?.name}</h1>
            </div>

            <div className='bg-white rounded-3 shadow-sm p-3 p-md-4 pb-5' >
                <div className="d-flex mb-4">
                    {/* Mientras espera la respuesta del backend */}
                    {isLoading && <IsLoadingMsg />}

                    {/* Si se recibió un error de parte del backend */}
                    {!isLoading && errorMsg && errorMsg !== "Peludito no encontrado" && <ErrorMsg />}

                    {/* Si no está esperando respuesta, no recibió error y el animal no es null */}
                    {
                        !isLoading && !errorMsg && animal &&
                            <AnimalInfoDetail animal={animal} />
                    }

                    {/* Si no está esperando respuesta, no recibió error y el animal es null */}
                    {!isLoading && errorMsg === "Peludito no encontrado" && <NotFoundMsg message={"Peludito no encontrado"} />} 
                </div>
            </div>
        </div>
    );
}