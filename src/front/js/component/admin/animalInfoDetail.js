import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../contexts/userContext";
import { formatAnimalData } from "../../../utils/fromattingFunctions";
import { deleteAnimal } from "../../../client-API/backendAPI";

import Carousel from '../carrousel';

const basicErrors = [
    "No se puede eliminar este peludito debido a registros relacionados",
    "Peludito no encontrado",
    "Acceso denegado. Se requiere rol de administrador"
]


export default function AnimalInfoDetail({ animal }) {
    const navigate = useNavigate();
    const { store: { token } } = useUserContext();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const formattedAnimal = formatAnimalData(animal);


    const onDelete = async (data) => {
        setErrorMsg("");
        setIsLoading(true);

        try {
            const response = await deleteAnimal(animal.id, token);
            setShowSuccessModal(response);
            setIsLoading(false);
        } catch (error) {
            console.error("Error on animal deleting: ", error);
            setErrorMsg(error.message);
            setIsLoading(false);
        }
    }


    return (
        <div className='d-flex flex-column mb-4'>

            <div className='d-flex flex-column flex-lg-row gap-3 mb-4'>
                {/* Carousel */}
                <Carousel imgUrlsArray={formattedAnimal.image_urls} />

                {/* Table */}
                <table className="table mb-3">
                    <tbody>
                        <tr>
                            <td className='text-neutral-60 col-5 col-lg-4'>Referencia</td>
                            <td className='text-primary fw-semibold'>: {formattedAnimal.identification_code}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60 col-5 col-lg-4'>ID</td>
                            <td className='text-neutral-60'>: {formattedAnimal.id}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Estado</td>
                            <td className='text-neutral-60'>: {formattedAnimal.status}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Sexo</td>
                            <td className='text-neutral-60'>: {formattedAnimal.gender}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Edad</td>
                            <td className='text-neutral-60'>: {formattedAnimal.age}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Tamaño</td>
                            <td className='text-neutral-60'>: {formattedAnimal.size}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Vacunado</td>
                            <td className='text-neutral-60'>: {formattedAnimal.vaccinated}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Desparasitado</td>
                            <td className='text-neutral-60'>: {formattedAnimal.dewormed}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Microchip</td>
                            <td className='text-neutral-60'>: {formattedAnimal.microchip}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Castrado</td>
                            <td className='text-neutral-60'>: {formattedAnimal.castrated}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Fecha Nacimiento</td>
                            <td className='text-neutral-60'>: {formattedAnimal.birth_date}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Fecha Publicación</td>
                            <td className='text-neutral-60'>: {formattedAnimal.publication_date}</td>
                        </tr>
                        <tr>
                            <td className='text-neutral-60'>Información Adicional</td>
                            <td className='text-neutral-60'>: {formattedAnimal.additional_information}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            { // Errores generados por validaciones del backend
                errorMsg &&
                <div className="alert alert-danger mt-3" role="alert">
                    {
                        errorMsg && basicErrors.includes(errorMsg) &&
                        { errorMsg }
                    }
                    {
                        errorMsg && !basicErrors.includes(errorMsg) &&
                        <p className="p-0 m-0">Ha ocurrido un error inesperado. Por favor contacta a soporte.</p>
                    }
                </div>
            }

            {/* Buttons */}
            <div className='d-flex flex-wrap gap-2 justify-content-end'>
                <button
                    className="btn btn-outline-primary rounded-pill px-4 py-2"
                    onClick={() => { navigate("/table-animals") }}
                >
                    Volver
                </button>

                <button
                    className="btn btn-secondary rounded-pill px-5 py-2"
                    onClick={() => { navigate(`/modify-animal/${formattedAnimal.id}`) }}
                >
                    Modificar
                </button>

                <button
                    className="btn btn-danger rounded-pill px-5 py-2"
                    onClick={() => setShowConfirmModal(true)}
                    disabled={isLoading}
                >
                    Borrar
                </button>
                {/* Spinner es renderizado mientras llega la respuesta del backend */}
                {
                    isLoading &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
            </div>

            {/* Modal que pide la confirmación para eliminar el registro*/}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showConfirmModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowConfirmModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="fs-4 fw-semibold text-danger"><i className="fa-solid fa-triangle-exclamation"></i> Atención</h2>
                            <p>Estás a punto de eliminar este registro de la base de datos. Esta es una acción irreversible.</p>
                            <p className="fw-semibold">¿Confirmas que quieres eliminar este registro?</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    onDelete();
                                    setShowConfirmModal(false);
                                }}
                            >
                                Confirmar Eliminación
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal que confirma la eliminación del registro*/}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showSuccessModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Notificación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => navigate("/table-animals")}></button>
                        </div>
                        <div className="modal-body">
                            <p>Registro eliminado correctamente.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => navigate("/table-animals")}>Ver lista de peluditos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}