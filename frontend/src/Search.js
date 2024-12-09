import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const SearchPet = ({ pets, setContacts }) => {
	const [petName, setPetName] = useState('');
	const [petsQuery, setPetsQuery] = useState([]);

	const fetchContacts = async () => {
		if (!petName.trim()) {
			alert('Please enter a pet name');
			return;
		}
		try {
			const response = await fetch(
				`http://localhost:8081/pet/name?contact_name=${encodeURIComponent(
					petName
				)}`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch pets');
			}
			const data = await response.json();
			setPetsQuery(data);
		} catch (err) {
			alert('There was an error loading the pet: ' + err.message);
		}
	};

	return (
		<div className="container">
			<h2 className="text-center mt-4">Search pet</h2>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Enter pet name"
					value={petName}
					onChange={(e) =>
						setPetName(e.target.value.toLowerCase())
					}
				/>
				<button className="btn btn-primary" onClick={fetchContacts}>
					Search
				</button>
			</div>

			<ul className="list-group">
				{petsQuery.map((pet) => (
					<li
						key={pet.id}
						className="list-group-item d-flex justify-content-between align-items-center">
						<div className="d-flex align-items-center">
							{pet.image_url && (
								<img
									src={`http://localhost:8081${pet.image_url}`}
									alt={pet.contact_name}
									style={{
										width: '50px',
										height: '50px',
										marginRight: '15px',
										objectFit: 'cover',
									}}
								/>
							)}
							<div>
								<strong>{pet.contact_name}</strong> -{' '}
								{pet.phone_number}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchPet;
