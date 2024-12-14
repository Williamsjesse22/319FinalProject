// Pets.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/pets.css';

// Parallax Tilt Effect Class
class parallaxTiltEffect {
	constructor({ element, tiltEffect }) {
		this.element = element;
		this.container = this.element.querySelector('.card');
		this.size = [this.container.offsetWidth, this.container.offsetHeight];
		[this.w, this.h] = this.size;

		this.tiltEffect = tiltEffect;

		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.defaultStates = this.defaultStates.bind(this);
		this.setProperty = this.setProperty.bind(this);

		this.init();
	}

	handleMouseMove(event) {
		const rect = this.container.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const offsetY = event.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const X = -(offsetX - centerX) / 10;
		const Y = (offsetY - centerY) / 10;

		this.setProperty('--rY', X.toFixed(2));
		this.setProperty('--rX', Y.toFixed(2));
	}

	handleMouseEnter() {
		this.container.classList.add('card--active');
	}

	handleMouseLeave() {
		this.defaultStates();
	}

	defaultStates() {
		this.container.classList.remove('card--active');
		this.setProperty('--rY', 0);
		this.setProperty('--rX', 0);
	}

	setProperty(p, v) {
		this.container.style.setProperty(p, v);
	}

	init() {
		console.log('Initializing tilt effect on:', this.element);
		this.element.addEventListener('mousemove', this.handleMouseMove);
		this.element.addEventListener('mouseenter', this.handleMouseEnter);
		this.element.addEventListener('mouseleave', this.handleMouseLeave);
	}
}

const Pets = () => {
	const [pets, setPets] = useState([]); // State to store the list of pets
	const navigate = useNavigate();

	const handleAdopt = (petId) => {
		navigate(`/adoptionForm/${petId}`);
	};

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

	useEffect(() => {
		// Apply the parallax tilt effect to each card container
		const cardContainers = document.querySelectorAll('.card-container');
		cardContainers.forEach((container) => {
			new parallaxTiltEffect({
				element: container,
				tiltEffect: 'normal',
			});
		});
	}, [pets]);

	return (
		<div className="container">
			<h2 className="text-center mt-4">Pets List</h2>
			<div className="album py-5 bg-light">
				<div className="container">
					<div className="row">
						{pets.map((pet) => (
							<div
								key={pet.petId}
								className="col-md-4 card-container">
								<div className="card mb-4 shadow-sm">
									<img
										src={pet.picture} // Assuming 'pet.url' contains the pet image URL
										className="card-img-top"
										alt={pet.name}
										style={{
											width: '100%', // Full width of the card
											height: '300px', // Fixed height for uniformity
											objectFit: 'cover', // Keeps the aspect ratio while cropping excess
										}}
									/>
									<div className="card-body">
										<div
											className="d-flex justify-content-between align-items-center"
											style={{ width: '100%' }} // Ensures the layout stretches across the container
										>
											<div>
												<p className="card-text mb-0">
													Name:{' '}
													<strong>{pet.name}</strong>{' '}
													({pet.animal})<br />
													Breed: {pet.breed}
												</p>
											</div>
											<button
												className="btn btn-primary"
												onClick={() =>
													handleAdopt(pet.petId)
												}>
												Adopt
											</button>
										</div>
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
