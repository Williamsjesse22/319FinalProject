import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdoptionForm = () => {
  const { petId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [pet, setPet] = useState(null); // State for the pet's information
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch pet information based on petId
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:8081/searchPet`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ petId }),
        });

        if (!response.ok) throw new Error("Failed to fetch pet information.");
        const data = await response.json();
        setPet(data); // Set the pet information
      } catch (err) {
        alert("Error fetching pet information: " + err.message);
      }
    };

    if (petId) fetchPet();
  }, [petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/adoptRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, petId }),
      });

      if (!response.ok) throw new Error("Failed to submit request.");
      alert("Adoption request submitted successfully!");
      navigate("/confetti"); // Redirect to the confetti page
    } catch (err) {
      alert("Error submitting request: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Adoption Form</h2>

      {/* Grid Layout for Form and Pet Information */}
      <div className="row">
        {/* Left Column - Adoption Form */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        {/* Right Column - Pet Information */}
        <div className="col-md-6">
          {pet ? (
            <div className="card">
              <img
                src={pet.picture}
                alt={pet.name}
                className="card-img-top"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">
                  <strong>Breed:</strong> {pet.breed}
                  <br />
                  <strong>Animal:</strong> {pet.animal}
                  <br />
                  <strong>Age:</strong> {pet.age}
                  <br />
                  <strong>Conditions:</strong> {pet.conditions}
                </p>
              </div>
            </div>
          ) : (
            <p>Loading pet information...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;
