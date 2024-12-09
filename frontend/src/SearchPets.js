import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

const SearchPet = () => {
  const [petId, setPetId] = useState("");
  const [pet, setPet] = useState(null);

  const fetchPet = async () => {
    if (!petId.trim()) {
      alert("Please enter a valid Pet ID");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/${petId}`);
      if (!response.ok) throw new Error("Pet not found.");
      const data = await response.json();
      setPet(data);
    } catch (err) {
      alert("Error fetching pet: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Search Pet</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Pet ID"
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchPet}>
          Search
        </button>
      </div>
      {pet && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{pet.name}</h5>
            <p className="card-text">Breed: {pet.breed}</p>
            <p className="card-text">Age: {pet.age}</p>
            <p className="card-text">Conditions: {pet.conditions}</p>
            {pet.picture && pet.picture.length > 0 && (
              <img
                src={pet.picture[0]}
                alt={pet.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPet;
