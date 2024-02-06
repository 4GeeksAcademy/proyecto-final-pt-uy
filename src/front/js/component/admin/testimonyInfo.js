import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { getTestimony} from "../../../client-API/backendAPI";
import { translateTestimonyStatus } from "../../../utils/fromattingFunctions";

import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";
import CardTestimony from "../cardTestimony";


export default function TestimonyInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [testimony, setTestimony] = useState(null);

    let status = "";
    let user, animal, adoption = null;
    if (testimony) {
        status = translateTestimonyStatus(testimony);
        user = testimony.user_info;
        animal = testimony.animal_info;
        adoption = testimony.adoption_info;
    }

    useEffect(() => {
        fetchTestimony();
    }, [])


    const fetchTestimony = async () => {
        setErrorMsg("");
        setIsLoading(true);
    
        try {
        const data = await getTestimony(id);
        setTestimony(data);
        setIsLoading(false);
        } catch (error) {
        console.error(`Error fetching testimony details: `, error);
        setErrorMsg(error.message);
        setIsLoading(false);
        }
    }


    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-end mb-3">
                {/* Title */}
                <h1 className='fs-4 fw-semibold m-0'>Ficha de Testimonio</h1>
            </div>
            <div className='bg-white rounded-3 shadow-sm p-3 p-md-4 pb-5' >
                <div className="d-flex mb-4">
                    {/* Mientras espera la respuesta del backend */}
                    {isLoading && <IsLoadingMsg />}

                    {/* Si se recibió un error de parte del backend */}
                    {!isLoading && errorMsg && errorMsg !== "Peludito no encontrado" && <ErrorMsg />}

                    {/* Si no está esperando respuesta, no recibió error y el animal no es null */}
                    {
                        !isLoading && !errorMsg && testimony &&
                        <div className="d-flex flex-column w-100">
                            {/* Testimony container */}
                            <div className="d-flex flex-column flex-lg-row gap-3 align-items-center w-100">
                                {/* Card */}
                                <CardTestimony testimony={testimony} />

                                {/* Datos */}
                                <table className="table mb-3">
                                    <tbody>
                                        <tr>
                                            <td className='text-neutral-60 col-5 col-lg-3'>ID</td>
                                            <td className='text-neutral-60'>: {testimony.id}</td>
                                            <td className='text-neutral-60 col-1'></td>
                                        </tr>
                                        <tr>
                                            <td className='text-neutral-60'>Estado</td>
                                            <td className='text-neutral-60'>: 
                                                <span className={status === "pendiente" ? "bg-pink-red px-2 py-1 rounded-3 text-white ms-2" : ""}>{status}</span>
                                            </td>
                                            <td className='text-neutral-60'></td>
                                        </tr>
                                        <tr>
                                            <td className='text-neutral-60'>Usuario</td>
                                            <td className='text-neutral-60'>: {`${user?.name} ${user?.last_name}`}</td>
                                            <td className='text-neutral-40'>
                                                <i 
                                                    id="user-icon" 
                                                    className="fa-solid fa-circle-user fs-5"
                                                    onClick={() => navigate(`/user-info/${user.id}`)}
                                                >   
                                                </i>
                                                <Tooltip
                                                    className="bg-primary rounded-3"
                                                    anchorSelect="#user-icon"
                                                    content="Ver ficha"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-neutral-60'>Peludito</td>
                                            <td className='text-neutral-60'>: {animal?.name}</td>
                                            <td className='text-neutral-40'>
                                                <i 
                                                    id="animal-icon" 
                                                    className="fa-solid fa-paw fs-5"
                                                    onClick={() => navigate(`/animal-info/${animal.id}`)}
                                                >   
                                                </i>
                                                <Tooltip
                                                    className="bg-primary rounded-3"
                                                    anchorSelect="#animal-icon"
                                                    content="Ver ficha"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-neutral-60'>Fecha Adopción</td>
                                            <td className='text-neutral-60'>: {adoption?.registration_date.substring(5,16)}</td>
                                            <td className='text-neutral-40'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-house-heart-fill fs-5" viewBox="0 0 16 16" 
                                                    id="adoption-icon" onClick={() => navigate(`/adoption-info/${adoption.id}`)}
                                                >
                                                    <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"/>
                                                    <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"/>
                                                </svg>
                                                <Tooltip
                                                    className="bg-primary rounded-3"
                                                    anchorSelect="#adoption-icon"
                                                    content="Ver ficha"
                                                />
                                            </td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    }

                    {/* Si no está esperando respuesta, no recibió error y el animal es null */}
                    {!isLoading && errorMsg === "Peludito no encontrado" && <NotFoundMsg message={"Peludito no encontrado"} />} 
                </div>
            </div>
        </div>
    );
}