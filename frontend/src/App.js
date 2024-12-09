<<<<<<< Updated upstream
// App.js
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddPet from "./AddPet";
import DeletePet from "./DeletePets";
import Pets from "./Pets"; // Import your Pets component
import SearchPet from "./SearchPets";
import Sidebar from "./Sidebar";

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
            <Route
              path="/"
              element={<h1>Welcome to the Pet Adoption App</h1>}
            />
            <Route path="/listPets" element={<Pets />} />{" "}
            {/* Display Pets component here */}
            <Route path="/searchPet" element={<SearchPet />} />
            <Route
              path="/addPet"
              element={<AddPet refreshPets={refreshPets} />}
            />
            <Route
              path="/deletePet"
              element={<DeletePet refreshPets={refreshPets} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
=======
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddPet from './AddPet';
import DeletePet from './DeletePets';
import Pets from './Pets';
import SearchPet from './SearchPets';
import Sidebar from './Sidebar';
import Welcome from './welcome/welcome'; // Animation component
import './welcome/welcome.css';

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
								<Route
									path="/searchPet"
									element={<SearchPet />}
								/>
								<Route path="/addPet" element={<AddPet />} />
								<Route
									path="/deletePet"
									element={<DeletePet />}
								/>
							</Routes>
						</div>
					</div>
				) : (
					<Welcome onAnimationEnd={handleAnimationEnd} />
				)}
			</div>
		</Router>
	);
>>>>>>> Stashed changes
};

export default App;
