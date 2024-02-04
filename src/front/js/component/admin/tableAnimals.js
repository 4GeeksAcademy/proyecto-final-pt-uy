import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAnimalsContext } from "../../contexts/animalsContext";
import { formatAnimalData } from "../../../utils/fromattingFunctions";

import Pagination from '../pagination';
import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";


export default function TableAnimals() {
    const navigate = useNavigate();
    const { store: { filters, animals, pagination, isLoading, error }, actions: { setAnimals, setStatuses } } = useAnimalsContext();

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
                                        const formatedAnimal = formatAnimalData(animal);

                                        return (
                                            <tr key={formatedAnimal.id} onClick={() => { navigate(`/animal-info/${formatedAnimal.id}`) }}>
                                                <td>
                                                    <figure className="d-flex justify-content-center overflow-hidden rounded border-2 m-0" style={{ width: "50px", height: "50px" }}>
                                                        <img src={formatedAnimal.image_urls[0]} />
                                                    </figure>
                                                </td>
                                                <td className="text-primary">{formatedAnimal.identification_code}</td>
                                                <td className="text-primary fw-semibold">{formatedAnimal.name}</td>
                                                <td className="d-none d-md-table-cell text-primary">{formatedAnimal.type}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{formatedAnimal.gender}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{formatedAnimal.age}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{formatedAnimal.size}</td>
                                                <td className="d-none d-xl-table-cell text-primary">{formatedAnimal.publication_date}</td>
                                                <td>
                                                    <button className="btn text-neutral-60 edit-button">
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                    <button className="btn text-neutral-60 delete-button">
                                                        <i className="fa-regular fa-trash-can"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <Pagination />
                    </>
                }

                {/* Si no está esperando respuesta, no recibió error y la lista de animales del store está vacía */}
                {!isLoading && !error && animals.length === 0 && <NotFoundMsg />}
            </div>
        </div>
    );
}