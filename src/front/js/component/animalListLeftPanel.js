import React from "react";

import { useAnimalsContext } from '../contexts/animalsContext';


export default function AnimalListLeftPanel() {
    const { store: {filters, sorting, pagination}, actions: {setFilters} } = useAnimalsContext();


    return (
        <div className='d-flex flex-column p-4 p-md-2 ps-md-0 me-2' style={{ width: "250px" }}>
            {/* Title */}
            <div className='border-bottom'>
                <h3 className='fw-semibold fs-5 mb-1'>Filtrar</h3>
            </div>

            {/* Type section */}
            <div className='border-bottom py-3'>
                <h4 className='fw-semibold fs-6 mb-2'>Especie</h4>

                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="dog" checked={filters.types.dog} />
                <label className="form-check-label" htmlFor="dog">
                    Perro
                </label>
                </div>

                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="cat" checked={filters.types.cat} />
                <label className="form-check-label" htmlFor="cat">
                    Gato
                </label>
                </div>
            </div>

            {/* Gender section */}
            <div className='border-bottom py-3'>
                <h4 className='fw-semibold fs-6 mb-2'>Sexo</h4>

                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="male" checked={filters.genders.male} />
                <label className="form-check-label" htmlFor="male">
                    Macho
                </label>
                </div>

                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="female" checked={filters.genders.female} />
                <label className="form-check-label" htmlFor="female">
                    Hembra
                </label>
                </div>
            </div>

            {/* Size section */}
            <div className='border-bottom py-3'>
                <h4 className='fw-semibold fs-6 mb-2'>Tamaño</h4>

                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="small" checked={filters.sizes.small} />
                <label className="form-check-label" htmlFor="small">
                    Pequeño
                </label>
                </div>

                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="medium" checked={filters.sizes.medium} />
                <label className="form-check-label" htmlFor="medium">
                    Mediano
                </label>
                </div>

                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="large" checked={filters.sizes.large} />
                <label className="form-check-label" htmlFor="large">
                    Grande
                </label>
                </div>
            </div>
        </div>
    );
}