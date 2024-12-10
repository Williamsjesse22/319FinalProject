import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddPet from "./AddPet";
import DeletePet from "./DeletePets";
import Pets from "./Pets";
import SearchPet from "./SearchPets";
import AdoptionForm from "./AdoptionForm";
import UpdatePet from "./UpdatePet";
import Sidebar from "./Sidebar";
import Welcome from "./welcome/welcome"; // Animation component
import "./welcome/welcome.css";

const App = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  return (
    <Router>
      <div className="app-container">
        {animationComplete ? (
          <div className="d-flex">
            <Sidebar />
            <div className="content flex-grow-1 p-3">
              <Routes>
                <Route path="/listPets" element={<Pets />} />
                <Route path="/searchPet" element={<SearchPet />} />
                <Route path="/adoptionForm/:petId" element={<AdoptionForm />} />
                <Route path="/addPet" element={<AddPet />} />
                <Route path="/updatePet" element={<UpdatePet />} />
                <Route path="/deletePet" element={<DeletePet />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Welcome onAnimationEnd={handleAnimationEnd} />
        )}
      </div>
    </Router>
  );
};

export default App;
