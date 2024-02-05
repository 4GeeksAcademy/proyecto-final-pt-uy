import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

import { useAnimalsContext } from "../../contexts/animalsContext";
import { formatAnimalData } from "../../../utils/fromattingFunctions";

import Pagination from '../pagination';
import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";


export default function TableAnimals() {
    const navigate = useNavigate();
    const { store: { filters, animals, pagination, isLoading, error }, actions: { setAnimals, setStatuses, setPagination } } = useAnimalsContext();

    useEffect(() => {
        setAnimals();
    }, []);

    useEffect(() => {
        setAnimals();
    }, [filters, pagination.currentPage]);



    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-end mb-3">
                {/* Title */}
                <h1 className='fs-4 fw-semibold m-0'>Peluditos</h1>

                <div className="d-flex bg-secondary rounded-4 px-2 py-1">
                    <p className="fs-7 text-primary m-0">{`${pagination.totalAnimals} peluditos`}</p>
                </div>
            </div>

            {/* Filters */}
            <div className='d-flex flex-column flex-md-row align-items-md-center mb-2'>
                <h4 className='fw-semibold fs-7 text-neutral-60 mb-2 mb-md-0 me-3'>Filtrar por Estado</h4>

                <div className="d-flex gap-2">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="not_adopted"
                            checked={filters.statuses.not_adopted}
                            onChange={() => setStatuses({ not_adopted: !filters.statuses.not_adopted })}
                        />
                        <label className="form-check-label text-neutral-60 fs-7" htmlFor="not_adopted">
                            No adoptado
                        </label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="adopted"
                            checked={filters.statuses.adopted}
                            onChange={() => setStatuses({ adopted: !filters.statuses.adopted })}
                        />
                        <label className="form-check-label text-neutral-60 fs-7" htmlFor="adopted">
                            Adoptado
                        </label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="passed_away"
                            checked={filters.statuses.passed_away}
                            onChange={() => setStatuses({ passed_away: !filters.statuses.passed_away })}
                        />
                        <label className="form-check-label text-neutral-60 fs-7" htmlFor="passed_away">
                            Fallecido
                        </label>
                    </div>
                </div>

            </div>

            <div className='bg-white rounded-3 shadow-sm p-3 p-md-4 pb-5' >
                {/* Mientras espera la respuesta del backend */}
                {isLoading && <IsLoadingMsg />}

                {/* Si se recibió un error de parte del backend */}
                {!isLoading && error && <ErrorMsg />}

                {/* Si no está esperando respuesta, no recibió error y hay animales en el store */}
                {
                    !isLoading && !error && animals.length > 0 &&
                    <>
                        <table className="table table-hover align-middle mb-5">
                            {/* Encabezados de la tabla */}
                            <thead>
                                <tr>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Foto</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Id_Cod</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Nombre</th>
                                    <th scope="col" className="d-none d-md-table-cell text-neutral-40 fw-medium" >Especie</th>
                                    <th scope="col" className="d-none d-lg-table-cell text-neutral-40 fw-medium" >Sexo</th>
                                    <th scope="col" className="d-none d-lg-table-cell text-neutral-40 fw-medium" >Edad</th>
                                    <th scope="col" className="d-none d-lg-table-cell text-neutral-40 fw-medium" >Tamaño</th>
                                    <th scope="col" className="d-none d-xl-table-cell text-neutral-40 fw-medium" >Fecha Registro</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Acciones</th>
                                </tr>
                            </thead>

                            {/* Cuerpo de la tabla */}
                            <tbody>
                                {
                                    animals.map((animal) => {
                                        const formattedAnimal = formatAnimalData(animal);

                                        return (
                                            <tr key={formattedAnimal.id}>
                                                <td>
                                                    <figure className="d-flex justify-content-center overflow-hidden rounded border-2 m-0" style={{ width: "50px", height: "50px" }}>
                                                        <img src={formattedAnimal.image_urls[0]} />
                                                    </figure>
                                                </td>
                                                <td className="text-primary">{formattedAnimal.identification_code}</td>
                                                <td className="text-primary fw-semibold">{formattedAnimal.name}</td>
                                                <td className="d-none d-md-table-cell text-primary">{formattedAnimal.type}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{formattedAnimal.gender}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{formattedAnimal.age}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{formattedAnimal.size}</td>
                                                <td className="d-none d-xl-table-cell text-primary">{formattedAnimal.publication_date}</td>
                                                <td className="z-3">
                                                    <button
                                                        id="profile-button"
                                                        className="btn text-neutral-60 profile-button fs-5"
                                                        onClick={() => { navigate(`/animal-info/${formattedAnimal.id}`) }}
                                                    >
                                                        <i className="fa-regular fa-file-lines"></i>
                                                    </button>
                                                    <Tooltip
                                                        className="bg-primary rounded-3"
                                                        anchorSelect="#profile-button"
                                                        content="Ver ficha"
                                                    />

                                                    <button
                                                        id="adoption-button"
                                                        className="btn text-neutral-60 adoption-button fs-5 px-2"
                                                        onClick={() => { navigate(`/add-adoption`) }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-heart" viewBox="0 0 16 16">
                                                            <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982" />
                                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                                        </svg>
                                                    </button>
                                                    <Tooltip
                                                        className="bg-primary rounded-3"
                                                        anchorSelect="#adoption-button"
                                                        content="Registrar adopción"
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <Pagination pagination={pagination} setPagination={setPagination} />
                    </>
                }

                {/* Si no está esperando respuesta, no recibió error y la lista de animales del store está vacía */}
                {!isLoading && !error && animals.length === 0 && <NotFoundMsg />}
            </div>
        </div>
    );
}