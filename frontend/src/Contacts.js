//-----------------------------------------------------------------------------------------------------------//
// Author: Phuong Tran
// Description: Component for displaying a list of contacts fetched from a backend server.
//-----------------------------------------------------------------------------------------------------------//

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling

//----------------------------------------------- Contacts Component ------------------------------------------------//
const Contacts = ({ contacts, setContacts }) => {
    // Fetches contacts from the backend when the component mounts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                // API call to fetch contacts
                const response = await fetch("http://localhost:8081/contact");
                if (!response.ok) {
                    throw new Error("Failed to fetch contacts"); // Handle non-200 responses
                }
                const data = await response.json();
                setContacts(data); // Update contacts state with the fetched data
            } catch (error) {
                alert("There was an error loading contacts: " + error); // Display error to the user
            }
        };

        fetchContacts(); // Invoke the fetch function
    }, [setContacts]); // Effect dependency: runs once on mount or when `setContacts` changes

    return (
        <div className="container">
            {/* Page Title */}
            <h2 className="text-center mt-4">Contacts List</h2>

            {/* List of Contacts */}
            <ul className="list-group">
                {contacts.map((contact) => (
                    <li key={contact.id} className="list-group-item d-flex align-items-center">
                        {/* Display Contact Image (if available) */}
                        {contact.image_url && (
                            <img
                                src={`http://localhost:8081${contact.image_url}`} // Full image URL
                                alt={contact.contact_name} // Accessible image description
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "15px",
                                    objectFit: "cover", // Maintain aspect ratio
                                }}
                            />
                        )}

                        {/* Contact Details */}
                        <div>
                            <strong>{contact.contact_name}</strong> - {contact.phone_number} {/* Name and phone */}
                            <p>{contact.message}</p> {/* Optional message */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
