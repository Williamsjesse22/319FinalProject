import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavbarTemp';
import Sidebar from './Sidebar';
import './styles/welcome.css';

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
	const [showWelcome, setShowWelcome] = useState(true);

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
					<Sidebar
						userRole={userRole}
						isLoggedIn={isLoggedIn}
						handleLogout={handleLogout}
					/>
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
							<Route path="*" element={<Navigate to="/" />} />

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

							{/* Fallback Route */}
							<Route
								path="*"
								element={<div>Page Not Found</div>}
							/>
						</Routes>
					</div>
				</>
			</div>
		</>
	);
};

export default App;
