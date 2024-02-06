import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

import { translateTestimonyStatus } from "../../../utils/fromattingFunctions";
import { getTestimonialsList } from "../../../client-API/backendAPI";

import UnderConstructionMsg from "../messages/underConstructionMsg";
import Pagination from '../pagination';
import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";

const initialPagination = {
    limit: 12,
    offset: 0,
    totalPages: 1,
    currentPage: 1,
    totalTestimonials: 0
}


export default function TableReviews() {
    const navigate = useNavigate();
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [pagination, setPagination] = useState(initialPagination);


    useEffect(() => {
        fetchTestimonials();
    }, []);

    useEffect(() => {
        fetchTestimonials();
    }, [pagination.currentPage]);



    const fetchTestimonials= async () => {
        const paginationParams = {page: pagination.currentPage, perPage: pagination.limit};
        const statuses = "pending,approved,rejected";
        
        setErrorMsg("");
        setIsLoading(true);
  
        try {
          const data = await getTestimonialsList(paginationParams, statuses);
          setTestimonials(data.result);
          setPagination(prevState => ({
            ...prevState,
            totalTestimonials: data.total_testimonials,
            totalPages: data.total_pages
          }))
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching testimonials: ", error);
          setErrorMsg(error.message);
          setIsLoading(false);
        }
    }


    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-end mb-3">
                {/* Title */}
                <h1 className='fs-4 fw-semibold m-0'>Testimonios</h1>

                <div className="d-flex bg-secondary rounded-4 px-2 py-1">
                    <p className="fs-7 text-primary m-0">{`${pagination.totalTestimonials} testimonios`}</p>
                </div>
            </div>

            <div className='bg-white rounded-3 shadow-sm p-3 p-md-4 pb-5' >
                {/* Mientras espera la respuesta del backend */}
                {isLoading && <IsLoadingMsg />}

                {/* Si se recibió un error de parte del backend */}
                {!isLoading && errorMsg && <ErrorMsg />}

                {/* Si no está esperando respuesta, no recibió error y hay testimonios en testimonials */}
                {
                    !isLoading && !errorMsg && testimonials.length > 0 &&
                    <>
                        <table className="table table-hover align-middle mb-5">
                            {/* Encabezados de la tabla */}
                            <thead>
                                <tr>
                                    <th scope="col" className="d-none d-xl-table-cell text-neutral-40 fw-medium" >ID</th>
                                    <th scope="col" className="d-none d-lg-table-cell text-neutral-40 fw-medium" >Foto</th>
                                    <th scope="col" className="d-none d-md-table-cell text-neutral-40 fw-medium" >Texto</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Status</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Acciones</th>
                                </tr>
                            </thead>

                            {/* Cuerpo de la tabla */}
                            <tbody>
                                {
                                    testimonials.map(testimony => {
                                        const status = translateTestimonyStatus(testimony);

                                        return (
                                            <tr key={testimony.id}>
                                                <td className="d-none d-xl-table-cell text-primary fw-medium" >{testimony.id}</td>
                                                <td className="d-none d-lg-table-cell">
                                                    <figure className="d-flex justify-content-center overflow-hidden rounded border-2 m-0" style={{ width: "50px", height: "50px" }}>
                                                        {/* Si el testimonio no tiene imagen, muestra la del animal adoptado */}
                                                        <img src={testimony.image_url || testimony.animal_info.image_urls[0]} />
                                                    </figure>
                                                </td>
                                                <td className="d-none d-md-table-cell text-primary" >{testimony.testimony_text}</td>
                                                <td className="text-primary">
                                                    <span className={status === "pendiente" ? "bg-pink-red px-2 py-1 rounded-3 text-white" : ""}>{status}</span>
                                                </td>
                                                <td>
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
                    </>
                }

            </div>

        </div>
    );
}