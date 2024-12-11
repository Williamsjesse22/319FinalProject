import React, { useState } from "react";

const SearchPets = () => {
  const [filters, setFilters] = useState({
    name: "",
    breed: "",
    animal: "",
    age: "",
  });
  const [pets, setPets] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchPetsByFilters = async () => {
    try {
      const response = await fetch("http://localhost:8081/searchPet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters), // Send filters as JSON in the request body
      });
      if (!response.ok) throw new Error("No pets found.");
      const data = await response.json();
      setPets(data);
    } catch (err) {
      alert("Error fetching pets: " + err.message);
    }
  };
  

  return (
    <div>
      <h2>Search Pets</h2>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="form-control"
          onChange={handleChange}
        />
        <input
          type="text"
          name="breed"
          placeholder="Enter Breed"
          className="form-control"
          onChange={handleChange}
        />
        <input
          type="text"
          name="animal"
          placeholder="Enter Animal Type"
          className="form-control"
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Enter Age"
          className="form-control"
          onChange={handleChange}
        />
        <button className="btn btn-primary mt-2" onClick={fetchPetsByFilters}>
          Search
        </button>
      </div>
      {pets.length > 0 ? (
        <div className="row mt-4">
          {pets.map((pet) => (
            <div key={pet.petId} className="col-md-4">
              <div className="card mb-4">
                <img src={pet.picture} alt={pet.name} className="card-img-top" />
                <div className="card-body">
                  <h5>{pet.name}</h5>
                  <p>{pet.breed}</p>
                  <p>Age: {pet.age}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No pets found.</p>
      )}
    </div>
  );
};

export default SearchPets;
