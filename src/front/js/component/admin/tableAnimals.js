import React from "react";

export default function TableAnimals() {

    return (
        <div>
            <h1 className='fs-4'>Peluditos</h1>

            <div className='bg-white rounded-1 shadow-sm p-3 p-md-4 pb-5' >
                <table className="table table-hover align-middle">
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
                        <tr onClick={() => { console.log("click en fila") }}>
                            <td>
                                <figure className="d-flex justify-content-center overflow-hidden rounded border-2 m-0" style={{ width: "50px", height: "50px" }}>
                                    <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706741601/youqlxfkug4aamdj7nis.jpg" />
                                </figure>
                            </td>
                            <td className="text-primary">RC0015</td>
                            <td className="text-primary fw-semibold">Zimba</td>
                            <td className="d-none d-md-table-cell text-primary">Gato</td>
                            <td className="d-none d-lg-table-cell text-primary">Macho</td>
                            <td className="d-none d-lg-table-cell text-primary">6 meses</td>
                            <td className="d-none d-lg-table-cell text-primary">Pequeño</td>
                            <td className="d-none d-xl-table-cell text-primary">24 Jan 2024</td>
                            <td>
                                <button className="btn text-neutral-60 edit-button">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button className="btn text-neutral-60 delete-button">
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>

                        <tr onClick={() => { console.log("click en fila") }}>
                            <td>
                                <figure className="d-flex justify-content-center overflow-hidden rounded border-2 m-0" style={{ width: "50px", height: "50px" }}>
                                    <img src="https://res.cloudinary.com/dnwfyqslx/image/upload/v1706741601/youqlxfkug4aamdj7nis.jpg" />
                                </figure>
                            </td>
                            <td className="text-primary">RC0015</td>
                            <td className="text-primary fw-semibold">Zimba</td>
                            <td className="d-none d-md-table-cell text-primary">Gato</td>
                            <td className="d-none d-lg-table-cell text-primary">Macho</td>
                            <td className="d-none d-lg-table-cell text-primary">6 meses</td>
                            <td className="d-none d-lg-table-cell text-primary">Pequeño</td>
                            <td className="d-none d-xl-table-cell text-primary">24 Jan 2024</td>
                            <td>
                                <button className="btn text-neutral-60 edit-button" onClick={() => { }}>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button className="btn text-neutral-60 delete-button" onClick={() => { }}>
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}