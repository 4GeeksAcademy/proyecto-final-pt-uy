export function formatAnimalData(animal) {
    const status = translateStatus(animal) || "sin datos";
    const type = translateType(animal) || "sin datos";
    const gender = translateGender(animal) || "sin datos";
    const publicationDate = animal.publication_date?.substring(5,16) || "sin datos";
    const birthDate = animal.birth_date?.substring(5,16) || "sin datos";
    const age = calculateAge(animal) || "sin datos";
    const size = translateSize(animal) || "sin datos";
    const vaccinated = animal.vaccinated === "yes" ? "Sí" : "No" || "sin datos";
    const dewormed = animal.dewormed === "yes" ? "Sí" : "No" || "sin datos";
    const microchip = animal.microchip === "yes" ? "Sí" : "No" || "sin datos";
    const castrated = animal.castrated === "yes" ? "Sí" : "No" || "sin datos";
    const additionalInfo = animal.additional_information || "";

    const formatedAnimal = {...animal};
    formatedAnimal.status = status;
    formatedAnimal.type = type;
    formatedAnimal.gender = gender;
    formatedAnimal.publication_date = publicationDate;
    formatedAnimal.birth_date = birthDate;
    formatedAnimal.size = size;
    formatedAnimal.vaccinated = vaccinated;
    formatedAnimal.dewormed = dewormed;
    formatedAnimal.microchip = microchip;
    formatedAnimal.castrated = castrated;
    formatedAnimal.additional_information = additionalInfo;
    formatedAnimal.age = age;

    return formatedAnimal;
}


export function calculateAge(animal) {
    let age = ""; 
    if (animal.birth_date) {
        const birthDateObj = new Date(animal.birth_date);
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
    return age;
}


export function translateSize(animal) {
    let translatedSize = "";
    if (animal.size) {
      switch (animal.size) {
        case "small":
          translatedSize = "Pequeño";
          break;
        case "medium":
          translatedSize = "Mediano";
          break;
        default:
          translatedSize = "Grande"
          break;
      }
    }
    return translatedSize;
}

export function translateStatus(animal) {
    let translatedStatus = "";
    if (animal.status) {
      switch (animal.status) {
        case "not_adopted":
          translatedStatus = "No adoptado";
          break;
        case "adopted":
          translatedStatus = "Adoptado";
          break;
        case "passed_away":
          translatedStatus = "Fallecido";
          break;
        default:
          translatedStatus = ""
          break;
      }
    }
    return translatedStatus;
}


export function translateGender(animal) {
    let translatedGender = "";
    if (animal.gender) {
      switch (animal.gender) {
        case "male":
          translatedGender = "Macho";
          break;
        case "female":
          translatedGender = "Hembra";
          break;
        default:
          translatedGender = ""
          break;
      }
    }
    return translatedGender;
}


export function translateType(animal) {
    let translatedType = "";
    if (animal.type) {
      switch (animal.type) {
        case "cat":
          translatedType = "Gato";
          break;
        case "dog":
          translatedType = "Perro";
          break;
        default:
          translatedType = ""
          break;
      }
    }
    return translatedType;
}


export function formatUserData(user) {
  const status = translateUserStatus(user) || "sin datos";
  const address = user.address || "sin datos";
  const backyard = user.backyard || "sin datos";
  const other_pets = user.other_pets || "sin datos";
  const phone_number = user.phone_number || "sin datos";
  const role = translateUserRole(user) || "sin datos";

  const formattedUser = {...user};
  formattedUser.status = status;
  formattedUser.address = address;
  formattedUser.backyard = backyard;
  formattedUser.other_pets = other_pets;
  formattedUser.phone_number = phone_number;
  formattedUser.role = role;

  return formattedUser;
}


export function formatAdoptionData(adoption) {
  const adoptionId = adoption.id;
  const registrationDate = adoption.registration_date.substring(5,16);
  const adopterId = adoption.user_id;
  const adopterFullName = `${adoption.user_info?.name} ${adoption.user_info?.last_name}`;
  const animalId = adoption.animal_id;
  const animalName = `${adoption.animal_info?.name}`;
  const adopterEmail = adoption.user_info?.email;
  const adopterPhone = adoption.user_info?.phone_number || "sin datos";
  const testimonyId = adoption.testimony_id;
  const testimonyStatus = adoption.testimony_info ? translateTestimonyStatus(adoption.testimony_info) : "sin testimonio";

  const formattedAdoption = {
    adoptionId, 
    registrationDate,
    adopterId,
    adopterFullName,
    animalId,
    animalName,
    adopterEmail,
    adopterPhone,
    testimonyId,
    testimonyStatus
  }

  return formattedAdoption;
}


export function translateUserStatus(user) {
  let translatedStatus = "";
  if (user.status) {
    switch (user.status) {
      case "active":
        translatedStatus = "Activo";
        break;
      case "deleted":
        translatedStatus = "Borrado";
        break;
      case "banned":
        translatedStatus = "Bloqueado";
        break;
      default:
        translatedStatus = ""
        break;
    }
  }
  return translatedStatus;
}


export function translateUserRole(user) {
  let translatedRole = "";
  if (user.role) {
    switch (user.role) {
      case "user":
        translatedRole = "Usuario";
        break;
      case "admin":
        translatedRole = "Admin.";
        break;
      default:
        translatedRole = ""
        break;
    }
  }
  return translatedRole;
}


export function translateTestimonyStatus(testimony) {
  let translatedStatus = "";
  if (testimony.status) {
    switch (testimony.status) {
      case "approved":
        translatedStatus = "aprobado";
        break;
      case "pending":
        translatedStatus = "pendiente";
        break;
      case "rejected":
        translatedStatus = "rechazado";
        break;
      default:
        translatedStatus = ""
        break;
    }
  }
  return translatedStatus;
}
