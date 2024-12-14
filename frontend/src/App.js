import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './Components/landing.js';
import Navbar from './Components/NavbarTemp';

// Component Imports
import AddPet from './AddPet';
import AdoptionForm from './AdoptionForm';
import ConfettiPage from './ConfettiPage';
import DeletePet from './DeletePets';
import Login from './Login';
import Pets from './Pets';
import SearchPet from './SearchPets';
import UpdatePet from './UpdatePet';

const App = () => {
	const [userRole, setUserRole] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogout = () => {
		setUserRole(null);
		setIsLoggedIn(false);
	};

	return (
		<>
			<Navbar
				userRole={userRole}
				isLoggedIn={isLoggedIn}
				handleLogout={handleLogout}
			/>
			<div className="app-container">
				<>
					<div className="content">
						<Routes>
							{/* Public Routes */}
							<Route path="/listPets" element={<Pets />} />
							<Route path="/searchPet" element={<SearchPet />} />
							<Route
								path="/adoptionForm/:petId"
								element={<AdoptionForm />}
							/>
							<Route
								path="/confetti"
								element={<ConfettiPage />}
							/>

							<Route
								path="/login"
								element={
									<Login
										setUserRole={setUserRole}
										setIsLoggedIn={setIsLoggedIn}
									/>
								}
							/>
							<Route
								path="/"
								element={
									<Landing />
								}	
							/>

							{/* Admin Routes */}
							{userRole === 'admin' && (
								<>
									<Route
										path="/addPet"
										element={<AddPet />}
									/>
									<Route
										path="/updatePet"
										element={<UpdatePet />}
									/>
									<Route
										path="/deletePet"
										element={<DeletePet />}
									/>
								</>
							)}
						</Routes>
					</div>
				</>
			</div>
		</>
	);
};

export default App;
