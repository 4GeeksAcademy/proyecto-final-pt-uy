import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useAnimalsContext } from '../contexts/animalsContext';

import AnimalListLeftPanel from '../component/animalListLeftPanel';
import AnimalsListSorting from '../component/animalsListSorting';
import Pagination from '../component/pagination';
import CardAnimal from '../component/cardAnimal';
import IsLoadingMsg from '../component/messages/isLoadingMsg';
import ErrorMsg from '../component/messages/errorMsg';
import NotFoundMsg from '../component/messages/notFoundMsg';



const AnimalList = () => {
  const { store: { animals, filters, sorting, pagination, isLoading, error }, actions: { setAnimals, setStatuses, setPagination } } = useAnimalsContext();

  useEffect(() => {
    // En este componente sólo se deben listar los animales con estado "not_adopted"
    setStatuses({
      not_adopted: true,
      adopted: false,
      passed_away: false
    });
  }, []);

  useEffect(() => {
    setAnimals();
  }, []);

  useEffect(() => {
    setAnimals();
  }, [filters, sorting, pagination.currentPage]);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [isLoading]);

  const iframeRef = useRef(null);

  const handleCloseModal = () => {
    // Detener el video al cerrar el modal
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const videoSrc = iframe.src;
      iframe.src = videoSrc;
    }
  };


  return (
    <div className='container d-flex flex-column my-4'>

      {/* Banner */}
      <div className='container rounded-3 d-flex flex-lg-row justify-content-center animal-list-banner' >
        <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706899712/Site/animalListBanner_img.png" alt="hand and paw" className="col-xl-5 col-xxl-6 d-none d-xl-block " />
        <div className="col-xl-7 col-xxl-6 p-5 pe-lg-5 me-lg-5 mt-xl-3 mt-xxl-5 text-center text-xl-end">
          <h2 className="fw-light mb-0 fs-0-2">Adopción Responsable</h2>
          <h4 className="fw-medium">Una Nueva Oportunidad Para Ser Feliz!</h4>
          <p className="mb-0 mt-4 fw-medium">¿Es tu hogar el hogar que un peludito necesita?</p>
          <p className="fw-medium">Te contamos qué tener en cuenta antes de tomar tu decisión.</p>
          <div>
            <button className="btn btn-outline-primary btn-outline-css-biggerSize rounded-pill mt-3 px-4 py-2 me-3 fw-medium" data-bs-toggle="modal" data-bs-target="#staticBackdrop5">
              Ver Video <i className="fa-solid fa-play ms-2"></i>
            </button>
            <Link to="/recomendations">
              <button className="btn btn-primary btn-css-biggerSize rounded-pill px-4 py-2 mt-3 fw-medium">Más información</button>
            </Link>
          </div>
        </div>
      </div>

      <div class="modal fade text-center" id="staticBackdrop5" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="ratio text-center ratio-16x9">
                <iframe ref={iframeRef} class="embed-responsive-item ratio-16x9  " src="https://www.youtube.com/embed/X9QxvAaf_kY?si=cs1zI3kBonUNLeO0" ></iframe>
              </div>
            </div>
            <div className="modal-footer m-0 p-0">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>volver</button>
            </div>
          </div>
        </div>
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
                  <AnimalsListSorting />
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
            {isLoading && <IsLoadingMsg />}

            {/* Si se recibió un error de parte del backend */}
            {!isLoading && error && <ErrorMsg />}

            {/* Si no está esperando respuesta, no recibió error y hay animales en el store */}
            {
              !isLoading && !error && animals.length > 0 &&
              animals.map((animal) => {
                return (
                  <CardAnimal key={animal.id} animal={animal} />
                )
              })
            }

            {/* Si no está esperando respuesta, no recibió error y la lista de animales del store está vacía */}
            {!isLoading && !error && animals.length === 0 && <NotFoundMsg />}
          </div>

          {/* Paginado */}
          <Pagination pagination={pagination} setPagination={setPagination} />

        </div>
      </main>
    </div>
  )
}

export default AnimalList;