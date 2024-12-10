import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DeletePet = ({ refreshPets }) => {
  const [petId, setPetId] = useState("");

  const handleDelete = async () => {
    if (!petId.trim()) {
      alert("Please enter a valid Pet ID");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/deletePet/${petId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete pet.");
      alert("Pet deleted successfully!");
      setPetId(""); // Reset the input field
      if (refreshPets) refreshPets(); // Refresh the list of pets if provided
    } catch (err) {
      alert("Error deleting pet: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Delete Pet</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Pet ID"
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
        />
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePet;
