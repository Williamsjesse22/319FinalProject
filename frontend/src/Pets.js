// Pets.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/pets.css";


const Pets = () => {
  const [pets, setPets] = useState([]); // State to store the list of pets
  const navigate = useNavigate();

  const handleAdopt = (petId) => {
    navigate(`/adoptionForm/${petId}`);
  };

  // Fetch pets from the backend when the component mounts
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:8081/listPets");
        if (!response.ok) throw new Error("Failed to fetch pets.");
        const data = await response.json();
        setPets(data); // Set the pets in state
      } catch (err) {
        alert("Error loading pets: " + err.message);
      }
    };

    fetchPets();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="container">
      <h2 className="text-center mt-4">Pets List</h2>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {pets.map((pet) => (
              <div key={pet.petId} className="col-md-4 card-container">
                <div className="card mb-4 shadow-sm">
                  <img
                    src={pet.picture} // Assuming 'pet.url' contains the pet image URL
                    className="card-img-top"
                    alt={pet.name}
                    style={{
                      width: "100%", // Full width of the card
                      height: "300px", // Fixed height for uniformity
                      objectFit: "cover", // Keeps the aspect ratio while cropping excess
                    }}
                  />
                  <div className="card-body">
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ width: "100%" }} // Ensures the layout stretches across the container
                    >
                      <div>
                        <p className="card-text mb-0">
                          Name: <strong>{pet.name}</strong> ({pet.animal})<br />
                          Breed: {pet.breed}
                        </p>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAdopt(pet.petId)}
                      >
                        Adopt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pets;
