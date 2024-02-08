import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

import { useUserContext } from "../../contexts/userContext";
import { formatUserData } from "../../../utils/fromattingFunctions";
import { modifyUserRole } from "../../../client-API/backendAPI";

import Pagination from '../pagination';
import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";


export default function TableUsers() {
    const navigate = useNavigate();
    const { store: { users, pagination, isLoading, error, token }, actions: { setUsers, setPagination } } = useUserContext();
    const [isWaiting, setIsWaiting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [userToChangeRole, setUserToChangeRole] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [roleIsChanged, setRoleIsChanged] = useState(false);


    useEffect(() => {
        setUsers();
    }, []);

    useEffect(() => {
        if (showConfirmationModal && roleIsChanged) {
            setShowConfirmationModal(false);
        }
        setUsers();

    }, [pagination.currentPage, roleIsChanged]);






    const handleIconClick = (user) => {
        setRoleIsChanged(false);
        setUserToChangeRole(user);
        setShowConfirmationModal(true);
    }

    const handleCloseModal = () => {
        setUserToChangeRole(null);
        setShowConfirmationModal(false);
    }


    const changeUserRole = async () => {
        const newRoleString = userToChangeRole.role === "user" ? "admin" : "user";
        setErrorMsg("");
        setIsWaiting(true);

        try {
            const data = await modifyUserRole(userToChangeRole.id, newRoleString, token);
            if (data) {
                setRoleIsChanged(true);
                setIsWaiting(false);
            }
        } catch (error) {
            console.error(`Error trying to change user role: `, error);
            setErrorMsg(error.message);
            setIsWaiting(false);
        }
    }



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
                                        const role = user.role;

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
                                                        className="btn text-neutral-60 light-blue-button fs-5"
                                                        onClick={() => { navigate(`/user-info/${formattedUser.id}`) }}
                                                    >
                                                        <i className="fa-regular fa-file-lines"></i>
                                                    </button>
                                                    <Tooltip
                                                        className="bg-primary rounded-3"
                                                        anchorSelect="#profile-button"
                                                        content="Ver ficha"
                                                    />

                                                    <button
                                                        id={`change-role-button-${user.id}`}
                                                        className="btn text-neutral-60 pink-red-button fs-5 px-2"
                                                        onClick={() => handleIconClick(user)}
                                                    >
                                                        {
                                                            role === "admin" ? <i className="fa-solid fa-lock"></i> : <i className="fa-solid fa-unlock"></i>
                                                        }
                                                    </button>
                                                    <Tooltip
                                                        className="bg-primary rounded-3"
                                                        anchorSelect={`#change-role-button-${user.id}`}
                                                        content={role === "admin" ? "Quitar rol administrador" : "Asignar rol administrador"}
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
                {!isLoading && !error && users.length === 0 && <NotFoundMsg message="No se encontraron usuarios" />}
            </div>


            {/* Modal que pide la confirmación para cambiar el rol de usuario*/}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showConfirmationModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseModal()}></button>
                        </div>
                        <div className="modal-body">
                            {
                                userToChangeRole?.role === "admin" &&
                                <p className="fw-semibold">¿Confirmas que quieres QUITAR el rol de administrador a {`${userToChangeRole.name} ${userToChangeRole.last_name}`}?</p>
                            }
                            {
                                userToChangeRole?.role === "user" &&
                                <p className="fw-semibold">¿Confirmas que quieres ASIGNAR el rol de administrador a {`${userToChangeRole.name} ${userToChangeRole.last_name}`}?</p>
                            }
                        </div>


                        { // Errores generados por validaciones del backend
                            errorMsg !== "" &&
                            <div className="alert alert-danger mt-3" role="alert">
                                {errorMsg}
                            </div>
                        }


                        {/* Botones */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => handleCloseModal()}
                                disabled={isWaiting}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => changeUserRole()}
                                disabled={isWaiting}
                            >
                                {isWaiting ? "Cargando..." : "Confirmar"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}