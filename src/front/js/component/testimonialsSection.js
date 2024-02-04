import React, {useState, useEffect} from "react";

import { getTestimonialsList } from "../../client-API/backendAPI";

import TestimonialsScrollBar from "./testimonialsScrollBar";
import IsLoadingMsg from "./messages/isLoadingMsg";
import ErrorMsg from "./messages/errorMsg";
import NotFoundMsg from "./messages/notFoundMsg";


export default function TestimonialsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
	const [testimonialsList, setTestimonialsList] = useState([]);


  useEffect(() => {
		fetchTestimonials();
	}, []);


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
          {isLoading && <IsLoadingMsg />}

          {/* Si se recibió un error de parte del backend */}
          {!isLoading && errorMsg && <ErrorMsg />}

          {/* Si no está esperando respuesta, no recibió error y hay testimonios en la lista */}
          {
              !isLoading && !errorMsg && testimonialsList.length > 0 &&
              <div className="d-flex w-100" >
                  <TestimonialsScrollBar testimonialsList={testimonialsList} />
              </div>
          }

          {/* Si no está esperando respuesta, no recibió error y la lista de testimonios está vacía */}
          {!isLoading && !errorMsg && testimonialsList.length === 0 && <NotFoundMsg message="No hay testimonios para mostrar en este momento." />}
      </div>
  );
}