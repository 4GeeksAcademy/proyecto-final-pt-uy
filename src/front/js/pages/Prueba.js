import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";
import { getUser, getAdoptionsByUser } from "../../client-API/backendAPI";

import CardAnimal from "../component/cardAnimal"; 
import CardTestimony from "../component/cardTestimony";


export default function Prueba() {
    const navigate = useNavigate();
    const {id} = useParams();
    const { store: { token }} = useUserContext();
    const [user, setUser] = useState(null);
    const [adoptions, setAdoptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");


    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            fetchAdoptions();
        }
    }, [user])

    
    const fetchUser = async () => {
        setErrorMsg("");
        setIsLoading(true);
    
        try {
          const data = await getUser(id, token);
          setUser(data);
          setIsLoading(false);
        } catch (error) {
          console.error(`Error fetching user by id: `, error);
          setErrorMsg(error.message);
          setIsLoading(false);
        }
    }

    const fetchAdoptions= async () => {   
        setErrorMsg("");
        setIsLoading(true);
  
        try {
          const data = await getAdoptionsByUser(id, token);
          setAdoptions(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching adoptions: ", error);
          setErrorMsg(error.message);
          setIsLoading(false);
        }
    }


    return (
        <div className="container d-flex flex-column my-4 py-4">
            <h1 className="fs-3 fw-semibold text-center">Prueba</h1>
            {
                isLoading &&
                <p>Cargando...</p>
            }

            {
                !isLoading && !errorMsg && adoptions &&
                <div className="d-flex w-100 flex-column">  
                    {
                        adoptions.map((adoption) => {
                            const animal = adoption.animal_info;
                            const testimony = adoption.testimony_info || null;
                            if (testimony) {
                                testimony.user_info = user;
                            }

                            return (
                                <div key={adoption.id} className="d-flex">
                                    <CardAnimal animal={animal} />
                                    {
                                        testimony ? <CardTestimony testimony={testimony} /> : <p onClick={() => navigate(`/testimony/${adoption.id}`)}>Sin testimonio</p>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}