import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdoptionForm = () => {
  const { petId } = useParams(); // Get petId from the URL
  const [pet, setPet] = useState(null); // State for storing pet data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  const navigate = useNavigate();

  // Fetch the specific pet's information
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:8081/searchPet?petId=${petId}`);
        if (!response.ok) throw new Error("Failed to fetch pet information.");
        const data = await response.json();
        setPet(data); // Update the pet state with fetched data
      } catch (error) {
        console.error("Error fetching pet information:", error);
        alert("Unable to load pet information.");
      }
    };

    fetchPet();
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

      if (!response.ok) throw new Error("Failed to submit adoption request.");
      alert("Adoption request submitted successfully!");
      navigate("/listPets"); // Redirect to the pets list after submission
    } catch (err) {
      alert("Error submitting request: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Adoption Form</h2>
      <div className="row">
        {/* Form Section */}
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3" style={{ textAlign: "left" }}>
              <label className="form-label" >Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3" style={{ textAlign: "left" }}>
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
            <div className="mb-3" style={{ textAlign: "left" }}>
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
            <div className="mb-3" style={{ textAlign: "left" }}>
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3" style={{ textAlign: "left" }}>
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ textAlign: "center"}} >
              Submit
            </button>
          </form>
        </div>

        {/* Pet Information Section */}
        <div className="col-md-4">
          {pet ? (
            <div className="card">
              <img
                src={pet.picture} // Ensure your backend sends a valid picture URL
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
