import React, {useState, useEffect} from "react";

import RandomAnimalsList from "./randomAnimalsList";

export default function SimilarAnimalsSection({animalType}) {
    return (
			<div className="container my-5">
        <h5 className="fw-medium">Peluditos Similares</h5>
        <RandomAnimalsList type={animalType} limit={4} />
      </div>
    );
}