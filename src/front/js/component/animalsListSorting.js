import React from "react";

import { useAnimalsContext } from "../contexts/animalsContext";


export default function AnimalsListSorting() {
    const {actions: {setSorting}} = useAnimalsContext();

    return (
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
    );
}