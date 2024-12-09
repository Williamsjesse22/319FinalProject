import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Pets = () => {
  const [pets, setPets] = useState([]);

  // Fetch pets when the component mounts
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:3000/listPets");
        if (!response.ok) throw new Error("Failed to fetch pets.");
        const data = await response.json();
        setPets(data);
      } catch (err) {
        alert("Error loading pets: " + err.message);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Pets List</h2>
      <ul className="list-group">
        {pets.map((pet) => (
          <li key={pet.petId} className="list-group-item">
            <strong>{pet.name}</strong> - {pet.breed}
            <p>{pet.conditions}</p>
            {pet.picture && (
              <img
                src={pet.picture[0]}
                alt={pet.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pets;
