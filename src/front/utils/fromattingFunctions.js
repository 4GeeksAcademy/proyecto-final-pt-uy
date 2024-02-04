export function formatAnimalData(animal) {
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