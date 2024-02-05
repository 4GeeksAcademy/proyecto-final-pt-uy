import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

import { useUserContext } from "../../contexts/userContext";
import { formatUserData } from "../../../utils/fromattingFunctions";

import Pagination from '../pagination';
import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";


export default function TableUsers() {
    const navigate = useNavigate();
    const { store: { users, pagination, isLoading, error }, actions: { setUsers, setPagination } } = useUserContext();

    useEffect(() => {
        setUsers();
    }, []);

    useEffect(() => {
        setUsers();
    }, [pagination.currentPage]);



    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-end mb-3">
                {/* Title */}
                <h1 className='fs-4 fw-semibold m-0'>Usuarios</h1>

                <div className="d-flex bg-secondary rounded-4 px-2 py-1">
                    <p className="fs-7 text-primary m-0">{`${pagination.totalUsers} usuarios`}</p>
                </div>
            </div>

            <div className='bg-white rounded-3 shadow-sm p-3 p-md-4 pb-5' >
                {/* Mientras espera la respuesta del backend */}
                {isLoading && <IsLoadingMsg />}

                {/* Si se recibió un error de parte del backend */}
                {!isLoading && error && <ErrorMsg />}

                {/* Si no está esperando respuesta, no recibió error y hay usuarios en el store */}
                {
                    !isLoading && !error && users.length > 0 &&
                    <>
                        <table className="table table-hover align-middle mb-5">
                            {/* Encabezados de la tabla */}
                            <thead>
                                <tr>
                                    <th scope="col" className="text-neutral-40 fw-medium" >ID</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Nombres</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Apellidos</th>
                                    <th scope="col" className="d-none d-md-table-cell text-neutral-40 fw-medium" >Email</th>
                                    <th scope="col" className="d-none d-lg-table-cell text-neutral-40 fw-medium" >Usuario</th>
                                    <th scope="col" className="d-none d-lg-table-cell text-neutral-40 fw-medium" >Adopciones</th>
                                    <th scope="col" className="d-none d-lg-table-cell text-neutral-40 fw-medium" >Estado</th>
                                    <th scope="col" className="d-none d-xl-table-cell text-neutral-40 fw-medium" >Rol</th>
                                    <th scope="col" className="text-neutral-40 fw-medium" >Acciones</th>
                                </tr>
                            </thead>

                            {/* Cuerpo de la tabla */}
                            <tbody>
                                {
                                    users.map((user) => {
                                        const formattedUser = formatUserData(user);

                                        return (
                                            <tr key={formattedUser.id}>
                                                <td className="text-primary fw-semibold">{formattedUser.id}</td>
                                                <td className="text-primary">{formattedUser.name}</td>
                                                <td className="text-primary">{formattedUser.last_name}</td>
                                                <td className="d-none d-md-table-cell text-primary">{formattedUser.email}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{formattedUser.user_name}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{formattedUser.adopted_animals.length}</td>
                                                <td className="d-none d-lg-table-cell text-primary">{formattedUser.status}</td>
                                                <td className="d-none d-xl-table-cell text-primary">{formattedUser.role}</td>
                                                <td className="z-3">
                                                    <button 
                                                        id="profile-button"
                                                        className="btn text-neutral-60 profile-button fs-5" 
                                                        onClick={() => {navigate(`/user-info/${formattedUser.id}`)}}
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
                                                        onClick={() => { navigate(`/add-adoption`)}}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-heart" viewBox="0 0 16 16">
                                                            <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982"/>
                                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
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

                        <Pagination pagination={pagination} setPagination={setPagination}/>
                    </>
                }

                {/* Si no está esperando respuesta, no recibió error y la lista de animales del store está vacía */}
                {!isLoading && !error && users.length === 0 && <NotFoundMsg message="No se encontraron usuarios"/>}
            </div>
        </div>
    );
}