import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Pets from "./Pets";
import AddPet from "./AddPet";
import DeletePet from "./DeletePets";
import SearchPet from "./SearchPets";


// Function to fetch all pets and display them on the page
function fetchData() {
	fetch("http://localhost:8081/listPets")
	  .then((response) => response.json())
	  .then((pets) => loadPets(pets))
	  .catch((error) => console.error("Error fetching pets:", error));
  }
  
  // Function to load and display pets in a card format
  function loadPets(pets) {
	const petContainer = document.getElementById("col");
	petContainer.innerHTML = ""; // Clear previous content
	pets.forEach((pet) => {
	  petContainer.innerHTML += `
		  <div class="col-md-4">
			<div class="card mb-4 shadow-sm">
			  <img src="${pet.url}" class="card-img-top" alt="${pet.name}">
			  <div class="card-body">
				<p class="card-text"><strong>${pet.name}</strong> (${pet.animal})</p>
			  </div>
			</div>
		  </div>`;
	});
  }
  
  // Function to fetch a single pet by ID and display its details
  function fetchOnePet() {
	const petId = document.getElementById("petId").value;
	fetch(`http://localhost:3000/${petId}`)
	  .then((response) => {
		if (!response.ok) throw new Error("Pet not found");
		return response.json();
	  })
	  .then((pet) => {
		document.getElementById("pet-detail").innerHTML = `
			<div class="card mb-4 shadow-sm">
			  <img src="${pet.url}" class="card-img-top" alt="${pet.name}">
			  <div class="card-body">
				<p class="card-text"><strong>${pet.name}</strong> (${pet.animal})</p>
			  </div>
			</div>`;
	  })
	  .catch((error) => {
		document.getElementById("pet-detail").innerText = error.message;
	  });
  }
  
  // Fetch all pets when the page loads
  fetchData();













const App = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshPets = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<h1>Welcome to the Pet Adoption App</h1>} />
            <Route path="/listPets" element={<Pets />} />
            <Route path="/searchPet" element={<SearchPet />} />
            <Route path="/addPet" element={<AddPet refreshPets={refreshPets} />} />
            <Route path="/deletePet" element={<DeletePet refreshPets={refreshPets} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
