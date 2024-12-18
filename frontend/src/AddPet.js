import React, { useState } from "react";

const AddPet = ({ refreshPets }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfBirth: "",
    breed: "",
    animal: "",
    conditions: "",
    picture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!formData.name || !formData.animal) {
      alert("Please fill in all required fields (Name, Animal).");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/addPet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send form data without petId
      });

      if (!response.ok) throw new Error("Failed to add pet.");
      alert("Pet added successfully!");

      if (refreshPets) refreshPets(); // Refresh the pet list if function is provided
      setFormData({
        name: "",
        age: "",
        dateOfBirth: "",
        breed: "",
        animal: "",
        conditions: "",
        picture: "",
      }); // Reset the form
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Pet</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="animal" className="form-label">
            Animal <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="animal"
            name="animal"
            className="form-control"
            value={formData.animal}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="form-control"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="breed" className="form-label">
            Breed
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            className="form-control"
            value={formData.breed}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="conditions" className="form-label">
            Conditions
          </label>
          <textarea
            id="conditions"
            name="conditions"
            className="form-control"
            rows="2"
            value={formData.conditions}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="picture" className="form-label">
            Picture URL
          </label>
          <input
            type="text"
            id="picture"
            name="picture"
            className="form-control"
            value={formData.picture}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">
            Add Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
