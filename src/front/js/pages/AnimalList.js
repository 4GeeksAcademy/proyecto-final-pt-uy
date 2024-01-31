import React, { useEffect } from 'react';

import { useAnimalsContext } from '../contexts/animalsContext';

import AnimalListLeftPanel from '../component/animalListLeftPanel';
import CardAnimal from '../component/cardAnimal';

import loadingImg from '../../img/loading.gif';
import errorImg from '../../img/error.png';
import notFoundImg from '../../img/notFound.png'


const AnimalList = () => {
  const { store: { animals, filters, sorting, pagination, isLoading, error }, actions: { setAnimals, setSorting, setPagination } } = useAnimalsContext();

  useEffect(() => {
    setAnimals();
  }, []);

  useEffect(() => {
    setAnimals();
  }, [filters, sorting, pagination.currentPage]);


  return (
    <div className='container d-flex flex-column my-4'>
      {/* Banner */}
      <div className='banner justify-content-center align-items-center bg-secondary rounded-3'>
        <h2>Banner</h2>
      </div>

      {/* Main */}
      <main className='d-flex w-100 my-4'>
        {/* LEFT PANEL */}
        <div className="offcanvas-md offcanvas-start animal-left-panel" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
          <div className="d-flex d-md-none justify-content-end bg-white position-relative z-3">
            <button
              type="button"
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasResponsive"
              className="btn-close position-absolute"
              style={{ top: "1rem", right: "1rem" }}
              aria-label="Close">
            </button>
          </div>

          <AnimalListLeftPanel />

        </div>


        {/* RIGHT PANEL */}
        <div className="d-flex flex-column w-100 m-0 ms-md-2" >
          {/* Navbar */}
          <div className="d-flex flex-row-reverse flex-md-row justify-content-between align-items-end">
            <div className='d-flex align-items-end'>
              <button className="btn d-md-none p-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
                <i className="fa-solid fa-filter"></i> Filtrar
              </button>

              <p className='d-none d-md-flex fs-7 fw-semibold text-neutral-40 m-0'>{`${pagination.totalAnimals} peluditos`}</p>
            </div>

            <nav className="d-flex justify-content-start justify-content-md-end flex-grow-1 fw-medium">
              <ul className="nav m-0 p-0">
                <li className="nav-item m-0 p-0">
                  <div className="dropdown">
                    <button className="btn btn-outline-primary rounded-4 dropdown-toggle fs-7" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "206px" }}>
                      Ordenar
                    </button>
                    <ul className="dropdown-menu">
                      <li><p className="dropdown-item" onClick={() => setSorting({ sortOrder: "desc", sortBy: "publication_date" })} >Últimos publicados</p></li>
                      <li><p className="dropdown-item" onClick={() => setSorting({ sortOrder: "asc", sortBy: "publication_date" })} >Primeros publicados</p></li>
                      <li><p className="dropdown-item" onClick={() => setSorting({ sortOrder: "desc", sortBy: "birth_date" })} >Por edad (menor a mayor)</p></li>
                      <li><p className="dropdown-item" onClick={() => setSorting({ sortOrder: "asc", sortBy: "birth_date" })} >Por edad (mayor a menor)</p></li>
                      <li><p className="dropdown-item" onClick={() => setSorting({ sortOrder: "asc", sortBy: "name" })} >Por nombre (A-Z) </p></li>
                      <li><p className="dropdown-item" onClick={() => setSorting({ sortOrder: "desc", sortBy: "name" })} >Por nombre (Z-A) </p></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          {/* Cantidad de peluditos (visible en Mobile) */}
          <div className='d-flex d-md-none w-100 my-2'>
            <p className='fs-7 fw-semibold text-neutral-40 m-0'>{`${pagination.totalAnimals} peluditos`}</p>
          </div>

          {/* Listado de cards */}
          <div className="d-flex flex-wrap justify-content-center align-items-start gap-3 gap-lg-4 my-4">
            {/* Mientras espera la respuesta del backend */}
            {
              isLoading &&
              <div className='d-flex flex-column w-100 align-items-center'>
                <figure className='d-flex justify-content-center overflow-hidden w-100' style={{ maxWidth: "250px" }}>
                  <img className='w-100' src={loadingImg} />
                </figure>
                <p className='fw-semibold'>Cargando...</p>
              </div>
            }

            {/* Si se recibió un error de parte del backend */}
            {
              !isLoading && error &&
              <div className='d-flex flex-column w-100 align-items-center'>
                <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "280px" }}>
                  <img className='w-100' src={errorImg} />
                </figure>
                <p className='fw-semibold'>Lo sentimos, ha ocurrido un error inesperado.</p>
              </div>
            }

            {/* Si no está esperando respuesta, no recibió error y hay animales en el store */}
            {
              !isLoading && !error && animals &&
              animals.map((animal) => {
                return (
                  <CardAnimal key={animal.id} animal={animal} />
                )
              })
            }

            {/* Si no está esperando respuesta, no recibió error y la lista de animales del store está vacía */}
            {
              !isLoading && !error && animals.length === 0 &&
              <div className='d-flex flex-column w-100 align-items-center'>
                <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "200px" }}>
                  <img className='w-100' src={notFoundImg} />
                </figure>
                <p className='fw-semibold text-center'>No encontramos peluditos <br />según los filtros activos.</p>
              </div>
            }

          </div>

          {/* Paginado */}
          <nav className='my-4'>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${pagination.currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className='page-link'
                onClick={() => setPagination({
                  currentPage: pagination.currentPage - 1,
                  offset: pagination.offset - pagination.limit
                })}
                >
                  Anterior
                </button>
              </li>
              {
                Array.from({ length: pagination.totalPages }, (value, index) => 1 + index).map((pageNum) => {
                  return (
                    <li className="page-item">
                      <button 
                        className={`page-link ${pagination.currentPage === pageNum ? "active" : ""}`} 
                        onClick={() => setPagination({
                          currentPage: pageNum,
                          offset: (pagination.limit * pageNum) - pagination.limit
                        })}
                      >
                        {pageNum}
                      </button>
                    </li>
                  )
                })
              }
              <li className={`page-item ${pagination.currentPage === pagination.totalPages ? "disabled" : ""}`}>
                <button
                  className='page-link'
                onClick={() => setPagination({
                  currentPage: pagination.currentPage + 1,
                  offset: pagination.offset + pagination.limit
                })}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>

      </main>
    </div>
  )
}

export default AnimalList;