import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ userRole, isLoggedIn, handleLogout }) => {
	const navDialogRef = useRef(null);

	const openNav = () => {
		navDialogRef.current.showModal();
		document.body.classList.add('nav-open');
	};

	const closeNav = () => {
		navDialogRef.current.close();
		document.body.classList.remove('nav-open');
	};

	const handleDialogClick = (event) => {
		if (event.target === navDialogRef.current) {
			closeNav();
		}
	};

	return (
		<>
			<button
				id="open-nav"
				className="material-symbols-outlined"
				onClick={openNav}>
				menu
			</button>

			<dialog
				id="nav-dialog"
				className="push-x"
				ref={navDialogRef}
				onClick={handleDialogClick}>
				<section>
					<header>
						<button
							id="close-nav"
							className="material-symbols-outlined"
							onClick={closeNav}>
							close
						</button>
					</header>

					<ul className="nav-list">
						<li>
							<Link to="../listPets" onClick={closeNav}>
								View All Pets
							</Link>
						</li>
						<li>
							<Link to="../searchPet" onClick={closeNav}>
								Search Pet
							</Link>
						</li>

						{userRole === 'admin' && (
							<>
								<li>
									<Link to="../addPet" onClick={closeNav}>
										Add Pet
									</Link>
								</li>
								<li>
									<Link to="../updatePet" onClick={closeNav}>
										Update Pet
									</Link>
								</li>
								<li>
									<Link to="../deletePet" onClick={closeNav}>
										Delete Pet
									</Link>
								</li>
							</>
						)}
						<li className="nav-item">
							{isLoggedIn ? (
								<button
									className="btn btn-danger w-100 mt-3"
									onClick={handleLogout}>
									Log Out
								</button>
							) : (
								<ol>
									<Link to="../login" onClick={closeNav}>
										Login
									</Link>
								</ol>
							)}
						</li>
					</ul>
				</section>
			</dialog>
		</>
	);
};

export default Navbar;
