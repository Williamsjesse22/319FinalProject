import React, { useState } from "react";

const AddPet = ({ refreshPets }) => {
  const [formData, setFormData] = useState({
    petId: "",
    name: "",
    age: "",
    dateOfBirth: "",
    breed: "",
    animal: "",
    conditions: "",
    picture: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/addPet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to add pet.");
      alert("Pet added successfully!");
      refreshPets();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pet ID"
        onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {/* Other fields */}
      <button type="submit">Add Pet</button>
    </form>
  );
};

export default AddPet;
