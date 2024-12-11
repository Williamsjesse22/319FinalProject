import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Login from "./Login";
import AddPet from "./AddPet";
import DeletePet from "./DeletePets";
import UpdatePet from "./UpdatePet";
import Pets from "./Pets";
import SearchPet from "./SearchPets";
import Welcome from "./welcome/welcome";
import "./welcome/welcome.css";
import AdoptionForm from "./AdoptionForm";
import ConfettiPage from "./ConfettiPage";
//import "./App.css";

const App = () => {
    const [userRole, setUserRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
  
    const handleLogout = () => {
      setUserRole(null);
      setIsLoggedIn(false);
    };
  
    const handleAnimationEnd = () => {
      setShowWelcome(false);
    };
  
    return (
      <Router>
        <div className="app-container">
          {showWelcome ? (
            <Welcome onAnimationEnd={handleAnimationEnd} />
          ) : (
            <>
              <Sidebar
                userRole={userRole}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
              />
              <div className="content">
                <Routes>
                  <Route
                    path="/login"
                    element={
                      <Login
                        setUserRole={setUserRole}
                        setIsLoggedIn={setIsLoggedIn}
                      />
                    }
                  />
                  <Route path="/listPets" element={<Pets />} />
                  <Route path="/searchPet" element={<SearchPet />} />
				  <Route path="/adoptionForm/:petId" element={<AdoptionForm />} />
				  <Route path="/confetti" element={<ConfettiPage />} />
                  {userRole === "admin" && (
                    <>
                      <Route path="/addPet" element={<AddPet />} />
                      <Route path="/updatePet" element={<UpdatePet />} />
                      <Route path="/deletePet" element={<DeletePet />} />
                    </>
                  )}
                </Routes>
              </div>
            </>
          )}
        </div>
      </Router>
    );
  };
  
  export default App;