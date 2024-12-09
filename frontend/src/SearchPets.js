import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

const SearchPet = () => {
  const [filters, setFilters] = useState({
    name: "",
    breed: "",
    animal: "",
    age: "",
  });
  const [pets, setPets] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const fetchPetsByFilters = async () => {
    const queryParams = new URLSearchParams(
      Object.entries(filters).filter(([_, value]) => value.trim() !== "")
    ).toString(); // Construct query string from non-empty fields

    try {
      const response = await fetch(`http://localhost:8081/searchPet?${queryParams}`);
      if (!response.ok) throw new Error("No pets found.");
      const data = await response.json();
      setPets(data);
    } catch (err) {
      alert("Error fetching pets: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Search Pet by Filters</h2>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            value={filters.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="breed"
            className="form-control"
            placeholder="Enter Breed"
            value={filters.breed}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="animal"
            className="form-control"
            placeholder="Enter Animal"
            value={filters.animal}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="age"
            className="form-control"
            placeholder="Enter Age"
            value={filters.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={fetchPetsByFilters}>
            Search
          </button>
        </div>
      </div>
      {pets.length > 0 ? (
        <div className="row">
          {pets.map((pet) => (
            <div key={pet.petId} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img
                  src={pet.picture}
                  className="card-img-top"
                  alt={pet.name}
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{pet.name}</h5>
                  <p className="card-text">Breed: {pet.breed}</p>
                  <p className="card-text">Animal: {pet.animal}</p>
                  <p className="card-text">Age: {pet.age}</p>
                  <p className="card-text">Conditions: {pet.conditions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No pets found.</p>
      )}
    </div>
  );
};

export default SearchPet;
