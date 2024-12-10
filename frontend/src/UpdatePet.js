import React, { useState, useEffect } from "react";

const UpdatePet = () => {
  const [formData, setFormData] = useState({
    petId: "",
    name: "",
    age: "",
    dateOfBirth: "",
    breed: "",
    animal: "",
    conditions: [],
    picture: "",
  });

  const [isPetFetched, setIsPetFetched] = useState(false); // Track whether pet data is loaded

  useEffect(() => {
    // Fetch pet information
    const fetchPet = async () => {
      try {
        const response = await fetch("http://localhost:8081/searchPet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ petId: formData.petId }),
        });
        if (!response.ok) throw new Error("Failed to fetch pet information.");
        const data = await response.json();
        setFormData({
          petId: data.petId || "",
          name: data.name || "",
          age: data.age || "",
          dateOfBirth: data.dateOfBirth || "",
          breed: data.breed || "",
          animal: data.animal || "",
          conditions: data.conditions || [],
          picture: data.picture || "",
        });
        setIsPetFetched(true);
      } catch (err) {
        alert("Error fetching pet information: " + err.message);
      }
    };

    if (!isPetFetched && formData.petId) {
      fetchPet();
    }
  }, [formData.petId, isPetFetched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/updatePet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the entire form data including petId
      });

      if (!response.ok) throw new Error("Failed to update pet.");
      alert("Pet updated successfully!");
      setIsPetFetched(false); // Reset fetch state
    } catch (err) {
      alert("Error updating pet: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Update Pet</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="petId" className="form-label">
            Pet ID <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            id="petId"
            name="petId"
            className="form-control"
            value={formData.petId}
            onChange={handleChange}
            required
          />
        </div>
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
            value={formData.conditions.join(", ")} // Display conditions as a comma-separated string
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                conditions: e.target.value.split(",").map((c) => c.trim()),
              }))
            }
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
            Update Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePet;
