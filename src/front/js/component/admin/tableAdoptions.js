import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

import { useUserContext } from "../../contexts/userContext";
import { formatAdoptionData } from "../../../utils/fromattingFunctions";
import { getAdoptionsList } from "../../../client-API/backendAPI";

import Pagination from '../pagination';
import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";

const initialPagination = {
    limit: 12,
    offset: 0,
    totalPages: 1,
    currentPage: 1,
    totalAdoptions: 0
}


export default function TableAdoptions() {
    const navigate = useNavigate();
    const { store: { token }} = useUserContext();
    const [adoptions, setAdoptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [pagination, setPagination] = useState(initialPagination);

    useEffect(() => {
        fetchAdoptions();
    }, []);

    useEffect(() => {
        fetchAdoptions();
    }, [pagination.currentPage]);


    const fetchAdoptions= async () => {
        const paginationParams = {page: pagination.currentPage, perPage: pagination.limit};
        
        setErrorMsg("");
        setIsLoading(true);
  
        try {
          const data = await getAdoptionsList(paginationParams, token);
          setAdoptions(data.result);
          setPagination(prevState => ({
            ...prevState,
            totalAdoptions: data.total_adoptions,
            totalPages: data.total_pages
          }))
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching adoptions: ", error);
          setErrorMsg(error.message);
          setIsLoading(false);
        }
    }


    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-end mb-3">
                {/* Title */}
                <h1 className='fs-4 fw-semibold m-0'>Adopciones</h1>

                <div className="d-flex bg-secondary rounded-4 px-2 py-1">
                    <p className="fs-7 text-primary m-0">{`${pagination.totalAdoptions} adopciones`}</p>
                </div>
            </div>

            <div className='bg-white rounded-3 shadow-sm p-3 p-md-4 pb-5' >
                {/* Mientras espera la respuesta del backend */}
                {isLoading && <IsLoadingMsg />}

                {/* Si se recibió un error de parte del backend */}
                {!isLoading && errorMsg && <ErrorMsg />}

                {/* Si no está esperando respuesta, no recibió error y hay adopciones en adoptions */}
                {
                    !isLoading && !errorMsg && adoptions.length > 0 &&
                    <>
                        <table className="table table-hover align-middle mb-5">
                            {/* Encabezados de la tabla */}
                            <thead>
                                <tr>
                                    <th scope="col" className="d-none d-xl-table-cell text-neutral-40 fw-medium" >ID</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Fecha Registro</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Adoptante</th>
                                    <th scope="col" className="d-none d-md-table-cell text-neutral-40 fw-medium" >Peludito</th>
                                    <th scope="col" className="d-none d-lg-table-cell text-neutral-40 fw-medium" >Email</th>
                                    <th scope="col" className="d-none d-xl-table-cell text-neutral-40 fw-medium" >Teléfono</th>
                                    <th scope="col" className="d-none d-lg-table-cell text-neutral-40 fw-medium" >Testimonio</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Acciones</th>
                                </tr>
                            </thead>

                            {/* Cuerpo de la tabla */}
                            <tbody>
                                {
                                    adoptions.map((adoption) => {
                                        const formattedAdoption = formatAdoptionData(adoption);
                                        const {adoptionId, adopterId, animalId, registrationDate, adopterFullName, animalName, adopterEmail, adopterPhone, testimonyStatus } = formattedAdoption;

                                        return (
                                            <tr key={adoptionId}>
                                                <td className="d-none d-xl-table-cell text-primary fw-semibold">{adoptionId}</td>
                                                <td className="text-primary">{registrationDate}</td>
                                                <td className="text-primary">{adopterFullName}</td>
                                                <td className="d-none d-md-table-cell text-primary">{animalName}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{adopterEmail}</td>
                                                <td className="d-none d-xl-table-cell text-primary">{adopterPhone}</td>
                                                <td className={`d-none d-lg-table-cell text-primary`}>
                                                    <span className={testimonyStatus === "pendiente" ? "bg-pink-red px-2 py-1 rounded-3 text-white" : ""}>{testimonyStatus}</span>
                                                </td>
                                                <td className="z-3">
                                                    <button 
                                                        id="info-button"
                                                        className="btn text-neutral-60 light-blue-button fs-5" 
                                                        onClick={() => {}}
                                                    >
                                                        <i className="fa-regular fa-file-lines"></i>
                                                    </button>
                                                    <Tooltip
                                                        className="bg-primary rounded-3"
                                                        anchorSelect="#info-button"
                                                        content="Ver ficha"
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <Pagination pagination={pagination} setPagination={setPagination}/>
                    </>
                }

                {/* Si no está esperando respuesta, no recibió error y la lista de adopciones del store está vacía */}
                {!isLoading && !errorMsg && adoptions.length === 0 && <NotFoundMsg message="No se encontraron adopciones"/>}
            </div>
        </div>
    );
}