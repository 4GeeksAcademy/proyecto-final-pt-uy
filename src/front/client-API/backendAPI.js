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

// Get user by id
export const getUser = async (user_id, token) => {
    try {
        const response = await fetch(`${apiUrlBase}/usuarios/usuario/${user_id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error on getting user:', error);
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



// Modify animal
export const modifyAnimal = async (id, formData, token) => {
    try {
        const response = await fetch(`${apiUrlBase}/animales/animal/${id}`, {
            method: "PUT",
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

        // Returns the modified animal
        return data.result;

    } catch (error) {
        console.error('Error trying to modify an animal', error);
        throw error;
    }
}


// Delete animal
export const deleteAnimal = async (id, token) => {
    try {
        const response = await fetch(`${apiUrlBase}/animales/animal/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            },
        });
        const data = await response.json();

        if (!response.ok) {
            const errorData = data;
            throw new Error(errorData.msg);
        }

        return true;

    } catch (error) {
        console.error('Error trying to delete an animal', error);
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
export const getAnimalList = async (pagination, sorting, filtering) => {
    const page = pagination?.page || 1;
    const perPage = pagination?.perPage || 12;
    const sortBy = sorting?.sortBy || "publication_date";
    const sortOrder = sorting?.sortOrder || "desc";
    const statusesArray = filtering?.statusesArray || [];
    const typesArray = filtering?.typesArray || [];
    const gendersArray = filtering?.gendersArray || [];
    const sizesArray = filtering?.sizesArray || [];

    let requestParams = `page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_order=${sortOrder}`;

    if (statusesArray.length > 0) {
        requestParams = requestParams + `&statuses=${statusesArray.join()}`;
    }
    if (typesArray.length > 0) {
        requestParams = requestParams + `&types=${typesArray.join()}`;
    }
    if (gendersArray.length > 0) {
        requestParams = requestParams + `&genders=${gendersArray.join()}`;
    }
    if (sizesArray.length > 0) {
        requestParams = requestParams + `&sizes=${sizesArray.join()}`;
    }

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
export const getRandomAnimalsList = async (type = "", limit = 4) => {
    const requestParams = `type=${type}&limit=${limit}`

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



// Get testimonials list
export const getTestimonialsList = async (pagination, statuses = "approved") => {
    const page = pagination?.page || 1;
    const perPage = pagination?.perPage || 12;

    let requestParams = `statuses=${statuses}&page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(`${apiUrlBase}/testimonios?${requestParams}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching testimonials list:', error);
        throw error;
    }
}



// Get testimony by id
export const getTestimony = async (id) => {
    try {
        const response = await fetch(`${apiUrlBase}/animales/animal/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching testimony details:', error);
        throw error;
    }
}




// Get users list
export const getUsersList = async (pagination, token) => {
    const page = pagination?.page || 1;
    const perPage = pagination?.perPage || 12;

    let requestParams = `page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(`${apiUrlBase}/usuarios?${requestParams}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching users list:', error);
        throw error;
    }
}



// Register adoption
export const addAdoption = async (user_id, animal_id, registration_date, token) => {
    try {
        const response = await fetch(`${apiUrlBase}/adopciones/adopcion`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, animal_id, registration_date })
        });
        const data = await response.json();

        if (!response.ok) {
            const errorData = data;
            throw new Error(errorData.msg);
        }

        return true;

    } catch (error) {
        console.error('Error trying to register an adoption', error);
        throw error;
    }
}



// Get adoptions list
export const getAdoptionsList = async (pagination, token) => {
    const page = pagination?.page || 1;
    const perPage = pagination?.perPage || 12;

    let requestParams = `page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(`${apiUrlBase}/adopciones?${requestParams}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching adoptions list:', error);
        throw error;
    }
}


// Get all adoptions
export const getAdoptions = async (token) => {
    try {
        const response = await fetch(`${apiUrlBase}/adopciones`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error on getting adopctions:', error);
        throw error;
    }
}



// Forgot password request
export const forgotPassRequest = async (email) => {

    try {
        const response = await fetch(`${apiUrlBase}/api/password-reset-request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en la solicitud de cambio de contraseña:', response.statusText);
            throw new Error(errorData.msg);
        }

        const responseData = await response.json();
        console.log(responseData);
        return responseData;

      } catch (error) {
        console.error('Error on forgot password request:', error);
        throw error;
      }
}


// Update password request
export const updatePassRequest = async (password, authTokenFromURL) => {

    try {
        // Realiza la solicitud al backend con el token obtenido de la URL
        const response = await fetch(`${apiUrlBase}/password-update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokenFromURL}`
          },
          body: JSON.stringify({password})
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en la solicitud de cambio de contraseña:', response.statusText);
            throw new Error(errorData.msg);
        }
  
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
        
    } catch (error) {
        console.error('Error on change password request:', error);
        throw error;
    }
}