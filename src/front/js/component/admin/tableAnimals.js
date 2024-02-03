import React, {useEffect} from "react";

import { useAnimalsContext } from "../../contexts/animalsContext";

import Pagination from '../pagination';


export default function TableAnimals() {
    const { store: { filters, animals, pagination, isLoading, error }, actions: { setAnimals, setStatuses } } = useAnimalsContext();

    useEffect(() => {
        setAnimals();
    }, []);
    
    useEffect(() => {
        setAnimals();
    }, [filters, pagination.currentPage]);


    function translateSize(animal) {
        let translatedSize = "";
        if ( animal && animal.size) {
          switch (animal.size) {
            case "small":
              translatedSize = "Pequeño";
              break;
            case "medium":
              translatedSize = "Mediano";
              break;
            default:
              translatedSize = "Grande"
              break;
          }
        }
        return translatedSize;
      }
    
    
      function calculateAge(animal) {
        let age = ""; 
        if (animal && animal.birth_date) {
          const birthDateObj = new Date(animal.birth_date);
          const timeDifference = Date.now() - birthDateObj.getTime();
    
          const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
          const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
          const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    
          if (years > 1) {
              age = `${years} años`;
          } else if (years === 1) {
              age = "1 año";
          } else if (months > 1) {
              age = `${months} meses`;
          } else if (months === 1) {
              age = "1 mes";
          } else {
              age = `${weeks} sem.`;
          }
        }
        return age;
      }
    

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
                {
                isLoading &&
                <div className='d-flex flex-column w-100 align-items-center align-self-center'>
                    <figure className='d-flex justify-content-center overflow-hidden w-100' style={{ maxWidth: "250px" }}>
                    <img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800965/Site/loading_mtemdl.gif" />
                    </figure>
                    <p className='fw-semibold'>Cargando...</p>
                </div>
                }

                {/* Si se recibió un error de parte del backend */}
                {
                !isLoading && error &&
                <div className='d-flex flex-column w-100 align-items-center'>
                    <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "280px" }}>
                    <img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800953/Site/error_pozpsi.png" />
                    </figure>
                    <p className='fw-semibold'>Lo sentimos, ha ocurrido un error inesperado.</p>
                </div>
                }

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
                            let gender = animal?.gender === "male" ? "Macho" : "Hembra" || "sin datos";
                            let publicationDate = animal?.publication_date?.substring(5,16) || "sin datos";
                            let age = calculateAge(animal) || "sin datos";
                            let size = translateSize(animal) || "sin datos";

                            return (
                                <tr key={animal.id} onClick={() => { console.log("click en fila") }}>
                                    <td>
                                        <figure className="d-flex justify-content-center overflow-hidden rounded border-2 m-0" style={{ width: "50px", height: "50px" }}>
                                            <img src={animal.image_urls[0]} />
                                        </figure>
                                    </td>
                                    <td className="text-primary">{animal.identification_code}</td>
                                    <td className="text-primary fw-semibold">{animal.name}</td>
                                    <td className="d-none d-md-table-cell text-primary">{animal.type || "Sin datos"}</td>
                                    <td className="d-none d-lg-table-cell text-primary">{gender}</td>
                                    <td className="d-none d-lg-table-cell text-primary">{age}</td>
                                    <td className="d-none d-lg-table-cell text-primary">{size}</td>
                                    <td className="d-none d-xl-table-cell text-primary">{publicationDate}</td>
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
                {
                !isLoading && !error && animals.length === 0 &&
                <div className='d-flex flex-column w-100 align-items-center'>
                    <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "200px" }}>
                    <img className='w-100' src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706800999/Site/notFound_a0yxua.png" />
                    </figure>
                    <p className='fw-semibold text-center'>No encontramos peluditos <br />según los filtros activos.</p>
                </div>
                }
            </div>
        </div>
    );
}