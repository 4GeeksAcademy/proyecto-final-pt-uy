import React from "react";
import { useNavigate } from "react-router-dom";


export default function CardAnimal({ animal = {} }) {
    const navigate = useNavigate();

    let sex = "s. d." // "s. d." significa "sin datos"
    if (animal.gender) {
        switch (animal.gender) {
            case "female":
                sex = "Hembra"
                break;
            case "male":
                sex = "Macho"
            default:
                sex = "s. d."
                break;
        }
    }

    let age = "s. d."; // "s. d." significa "sin datos"
    if (animal.birthDate) {
        const birthDateObj = new Date(animal.birthDate);
        const timeDifference = Date.now() - birthDateObj.getTime();

        const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
        const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

        if (years > 1) {
            age = `${years} años`;
        } else if (years === 1) {
            age = "1 año";
        } else if (months > 1) {
            age = `${months} meses`;
        } else if (months === 1) {
            age = "1 mes";
        } else {
            age = `${weeks} sem.`;
        }
    }


    return (
        <div className="animal-card bg-white rounded-3 p-2" onClick={() => navigate(`/animal-profile/${animal.id}`)}>
            <figure className="rounded-3">
                {/* TO-DO: Agregar imagen por defecto para casos donde no tenga imagen */}
                <img src={animal.imageUrl} />
            </figure>
            <p className="fw-semibold fs-5 mb-1">{`${animal.identificationCode} ${animal.name}`}</p>

            <div className="d-flex flex-column flex-xl-row w-100 align-items-center mb-2">
                <p className="text-neutral-40 fs-7 text-center w-100 mb-0">Sexo:
                    <span className="fw-semibold"> {sex}</span>
                </p>
                <p className="text-neutral-40 fs-7 text-center w-100 mb-0">Edad:
                    <span className="fw-semibold"> {age}</span>
                </p>
            </div>

        </div>
    );
}