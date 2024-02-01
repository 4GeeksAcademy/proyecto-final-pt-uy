import React, { useEffect, useState } from "react";

import { getRandomAnimalsList } from "../../client-API/backendAPI";

import CardAnimal from "./cardAnimal";

import loadingImg from '../../img/loading.gif';
import errorImg from '../../img/error.png';
import notFoundImg from '../../img/notFound.png'



export default function RandomAnimalsList({type, limit = 5}) {
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
            const data = await getRandomAnimalsList(`type=${type}&limit=${limit}`);
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
            {
                isLoading &&
                <div className='d-flex flex-column w-100 align-items-center'>
                    <figure className='d-flex justify-content-center overflow-hidden w-100' style={{ maxWidth: "200px" }}>
                        <img className='w-100' src={loadingImg} />
                    </figure>
                    <p className='fw-semibold'>Cargando...</p>
                </div>
            }

            {/* Si se recibió un error de parte del backend */}
            {
                !isLoading && errorMsg &&
                <div className='d-flex flex-column w-100 align-items-center'>
                    <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "220px" }}>
                        <img className='w-100' src={errorImg} />
                    </figure>
                    <p className='fw-semibold'>Lo sentimos, ha ocurrido un error inesperado.</p>
                </div>
            }

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
            {
                !isLoading && !errorMsg && randomAnimals.length === 0 &&
                <div className='d-flex flex-column w-100 align-items-center'>
                    <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "150px" }}>
                        <img className='w-100' src={notFoundImg} />
                    </figure>
                    <p className='fw-semibold text-center'>No hay peluditos que mostrar en este momento.</p>
                </div>
            }
        </div>
    );
}