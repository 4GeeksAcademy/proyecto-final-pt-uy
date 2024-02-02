const apiUrlBase = process.env.BACKEND_URL;


// Login 
export const login = async (email, password) => {
    try {
        const response = await fetch(`${apiUrlBase}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return { token: data.token, user: data.user };

    } catch (error) {
        console.error('Error fetching token:', error);
        throw error; // Lanzar la excepción para que se propague hacia arriba
    }
}


// Register user
export const registerUser = async ({ name, last_name, username, email, password }) => {
    try {
        const response = await fetch(`${apiUrlBase}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, last_name, username, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        return true;

    } catch (error) {
        console.error('Error on register user:', error);
        throw error;
    }
}



// Register animal
export const addAnimal = async (formData, token) => {
    try {
        const response = await fetch(`${apiUrlBase}/animales/animal`, {
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
        throw error;
    }
}


// Get animal by id
export const getAnimal = async (id) => {
    try {
        const response = await fetch(`${apiUrlBase}/animales/animal/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching animal details:', error);
        throw error;
    }
}


// Get animals list
export const getAnimalList = async (requestParams = "") => {
    try {
        const response = await fetch(`${apiUrlBase}/animales?${requestParams}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching animal list:', error);
        throw error;
    }
}


// Get random animals list
export const getRandomAnimalsList = async (requestParams = "") => {

    try {
        const response = await fetch(`${apiUrlBase}/animales/random?${requestParams}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching random animals list:', error);
        throw error;
    }
}


// get testimonials list
export const getTestimonialsList = async (limit = 8, status = "approved") => {
    const requestParams = `limit=${limit}&status=${status}`;

    try {
        const response = await fetch(`${apiUrlBase}/testimonios?${requestParams}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        console.log(data.result);
        return data.result;

    } catch (error) {
        console.error('Error fetching testimonials list:', error);
        throw error;
    }
}
