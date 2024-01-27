const apiUrlBase = process.env.BACKEND_URL;

// Hasta terminar de integrar el login, se hardcodea el token:
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwNjMxODUyNywianRpIjoiZGM1NGRhYmMtNzBkYi00MjQ4LTkwYjctMjViNTVkYmQ3OWQ1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6OCwibmJmIjoxNzA2MzE4NTI3LCJjc3JmIjoiYTVmN2FkNzEtZTM1Zi00YjJjLWE3NmItZmZiMTc2Yjk0N2VjIiwiZXhwIjoxNzA2MzE5NDI3fQ.wIC-rSoPXGHeW0icLlgSVR2gBLVKHcJSWUvHMRYeyi8";


// Register animal
export const addAnimal = async (formData) => {
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


