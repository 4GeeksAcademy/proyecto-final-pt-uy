import { useUserContext } from '../js/contexts/userContext.js';

const apiUrlBase = process.env.BACKEND_URL;


// Obtener el token desde el contexto 
export const getTokenFromContext = () => {
    const { store } = useUserContext();
    return store.token;
};


// Login 
export const login = async (email, password) => {
    try {
        const response = await fetch(`${apiUrlBase}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return {token: data.token, user: data.user};

    } catch (error) {
        console.error('Error fetching token:', error);
        throw error; // Lanzar la excepción para que se propague hacia arriba
    }
}


// Register animal
export const addAnimal = async (formData) => {
    const token = getTokenFromContext();

    try {
        const response = await fetch(`${apiUrlBase}api/animal`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: formData,
        });
        const data = await response.json();

        if (!response.ok) {
            const errorData = data;
            throw new Error(errorData.msg);
        }
        
        // Returns the registered animal
        return data.result;

    } catch (error) {
        console.error('Error trying to register an animal', error);
        throw error; // Lanzar la excepción para que se propague hacia arriba
    }
}


