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
        body: JSON.stringify(filters),
      });
      if (!response.ok) throw new Error("No pets found.");
      const data = await response.json();
      setPets(data);
    } catch (err) {
      alert("Error fetching pets: " + err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Search Pets</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
          width: "100%",
          maxWidth: "600px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          style={{
            flex: "1 1 100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
          onChange={handleChange}
        />
        <input
          type="text"
          name="breed"
          placeholder="Enter Breed"
          style={{
            flex: "1 1 100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
          onChange={handleChange}
        />
        <input
          type="text"
          name="animal"
          placeholder="Enter Animal Type"
          style={{
            flex: "1 1 100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Enter Age"
          style={{
            flex: "1 1 100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
          onChange={handleChange}
        />
        <button
          style={{
            flex: "1 1 100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={fetchPetsByFilters}
        >
          Search
        </button>
      </div>
      {pets.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {pets.map((pet) => (
            <div
              key={pet.petId}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "300px",
                overflow: "hidden",
                textAlign: "center",
                padding: "10px",
              }}
            >
              <img
                src={pet.picture}
                alt={pet.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "10px" }}>
                <h5 style={{ margin: "10px 0" }}>{pet.name}</h5>
                <p style={{ margin: "5px 0" }}>{pet.breed}</p>
                <p style={{ margin: "5px 0" }}>Age: {pet.age}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "20px", fontSize: "1.2rem", color: "#666" }}>
          No pets found.
        </p>
      )}
    </div>
  );
};

export default SearchPets;
