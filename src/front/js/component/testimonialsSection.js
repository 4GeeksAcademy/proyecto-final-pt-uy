import React, {useState, useEffect} from "react";

import { getTestimonialsList } from "../../client-API/backendAPI";

import TestimonialsScrollBar from "./testimonialsScrollBar";

import loadingImg from '../../img/loading.gif';
import errorImg from '../../img/error.png';
import notFoundImg from '../../img/notFound.png'


export default function TestimonialsSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
	const [testimonialsList, setTestimonialsList] = useState([]);


    useEffect(() => {
		fetchTestimonials();
	}, [])


    const fetchTestimonials = async () => {
		setErrorMsg("");
        setIsLoading(true);
		
		try {
			const data = await getTestimonialsList();
			setTestimonialsList(data);
			setIsLoading(false);
		} catch (error) {
			console.error(`Error fetching testimonials list: `, error);
            setErrorMsg(error.message);
            setIsLoading(false);
		}
	}


    return (
        <div className="my-5 container">
            <h5 className="fw-medium">Testimonios</h5>

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
              !isLoading && errorMsg &&
              <div className='d-flex flex-column w-100 align-items-center'>
                <figure className='d-flex justify-content-center overflow-hidden w-100 mb-4' style={{ maxWidth: "280px" }}>
                  <img className='w-100' src={errorImg} />
                </figure>
                <p className='fw-semibold'>Lo sentimos, ha ocurrido un error inesperado.</p>
              </div>
            }

            {/* Si no está esperando respuesta, no recibió error y hay testimonios en la lista */}
            {
                !isLoading && !errorMsg && testimonialsList.length > 0 &&
                <div className="p-2 grid gap-3 d-flex flex-row row-cols-2 scroll-bar" style={{ overflowX: "scroll" }} >
                    <TestimonialsScrollBar testimonialsList={testimonialsList} />
                </div>
            }

            {/* Si no está esperando respuesta, no recibió error y la lista de testimonios está vacía */}
            {
              !isLoading && !errorMsg && testimonialsList.length === 0 &&
              <div className='d-flex flex-column w-100 align-items-center'>
                <figure className='d-flex justify-content-center overflow-hidden w-100 my-4' style={{ maxWidth: "170px" }}>
                  <img className='w-100' src={notFoundImg} />
                </figure>
                <p className='fw-semibold text-center'>No hay testimonios para mostrar en este momento.</p>
              </div>
            }

            
		</div>
    );
}