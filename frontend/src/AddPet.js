import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const AddContact = ({ contacts, setContacts }) => {
	const [contactName, setContactName] = useState(''); // Name of the contact
	const [phoneNumber, setPhoneNumber] = useState(''); // Contact's phone number
	const [message, setMessage] = useState(''); // Optional message for the contact
	const [image, setImage] = useState(null); // Uploaded image file
	const [preview, setPreview] = useState(null); // URL for the image preview

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setPreview(URL.createObjectURL(file)); // Generate preview URL for the uploaded image
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		addOneContact(); // Add the contact to the backend
		clearForm(); // Clear the form fields
	};

	const addOneContact = async () => {
		try {
			const formData = new FormData(); // Use FormData for sending file uploads
			formData.append('contact_name', contactName);
			formData.append('phone_number', phoneNumber);
			formData.append('message', message);
			formData.append('image', image);

			const response = await fetch('http://localhost:8081/contact', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				alert('Error: ' + errorData.error); // Show error message
			} else {
				const successMessage = await response.text();
				alert(successMessage); // Notify success
				setContacts([
					...contacts,
					{
						contactName,
						phoneNumber,
						message,
						imageUrl: URL.createObjectURL(image),
					},
				]);
			}
		} catch (err) {
			alert('An error occurred: ' + err); // Log unexpected errors
		}
	};

	const clearForm = () => {
		setContactName('');
		setPhoneNumber('');
		setMessage('');
		setImage(null);
		setPreview(null);
	};

	return (
		<div className="container mt-4">
			<h2 className="text-center">Add New Contact</h2>

			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Contact Name</label>
					<input
						type="text"
						className="form-control"
						value={contactName}
						onChange={(e) => setContactName(e.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Phone Number</label>
					<input
						type="text"
						className="form-control"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Message</label>
					<textarea
						className="form-control"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Contact Image</label>
					<input
						type="file"
						className="form-control"
						onChange={handleImageChange}
					/>
					{preview && (
						<img
							src={preview}
							alt="Preview"
							className="mt-3"
							style={{
								width: '100px',
								height: '100px',
								objectFit: 'cover',
							}}
						/>
					)}
				</div>

				<button type="submit" className="btn btn-primary">
					Add Contact
				</button>
			</form>
		</div>
	);
};

export default AddContact;
