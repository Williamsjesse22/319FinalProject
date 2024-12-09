// Pets.js
import React, { useEffect, useState } from 'react';

const Pets = () => {
	const [pets, setPets] = useState([]); // State to store the list of pets

	// Fetch pets from the backend when the component mounts
	useEffect(() => {
		const fetchPets = async () => {
			try {
				const response = await fetch('http://localhost:8081/listPets');
				if (!response.ok) throw new Error('Failed to fetch pets.');
				const data = await response.json();
				setPets(data); // Set the pets in state
			} catch (err) {
				alert('Error loading pets: ' + err.message);
			}
		};

		fetchPets();
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	return (
		<div className="container">
			<h2 className="text-center mt-4">Pets List</h2>
			<div className="album py-5 bg-light">
				<div className="container">
					<div className="row">
						{pets.map((pet) => (
							<div key={pet.petId} className="col-md-4">
								<div className="card mb-4 shadow-sm">
									<img
										src={pet.url} // Assuming 'pet.url' contains the pet image URL
										className="card-img-top"
										alt={pet.name}
									/>
									<div className="card-body">
										<p className="card-text">
											<strong>{pet.name}</strong> (
											{pet.animal})
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pets;
