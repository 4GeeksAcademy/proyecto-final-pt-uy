import React, { useEffect, useState } from "react";

import { getRandomAnimalsList } from "../../client-API/backendAPI";

import CardAnimal from "./cardAnimal";
import IsLoadingMsg from "./messages/isLoadingMsg";
import ErrorMsg from "./messages/errorMsg";
import NotFoundMsg from "./messages/notFoundMsg";


export default function RandomAnimalsList({type, limit = 4}) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [randomAnimals, setRandomAnimals] = useState([]);

    useEffect(() => {
        fetchAnimals();
    }, []);

    const fetchAnimals = async () => {
        setErrorMsg("");
        setIsLoading(true);

        try {
            const data = await getRandomAnimalsList(type, limit);
            setRandomAnimals(data.result);
            setIsLoading(false);
        } catch (error) {
            console.error(`Error fetching random ${type}s: `, error);
            setErrorMsg(error.message);
            setIsLoading(false);
        }
    }


    return (
        <div className="d-flex flex-wrap flex-lg-nowrap justify-content-evenly align-items-start gap-3 gap-lg-4 my-4">
            {/* Mientras espera la respuesta del backend */}
            {isLoading && <IsLoadingMsg />}

            {/* Si se recibió un error de parte del backend */}
            {!isLoading && errorMsg && <ErrorMsg />}

            {/* Si no está esperando respuesta, no recibió error y hay animales en la lista */}
            {
                !isLoading && !errorMsg && randomAnimals.length > 0 &&
                randomAnimals.map((animal) => {
                    return (
                        <CardAnimal key={animal.id} animal={animal} />
                    )
                })
            }

            {/* Si no está esperando respuesta, no recibió error y las listas de animales están vacías */}
            {!isLoading && !errorMsg && randomAnimals.length === 0 && <NotFoundMsg />}
        </div>
    );
}