// import React, { useEffect, useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";

// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Initialize the app and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB configuration
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'secoms3190';
const client = new MongoClient(url);

// Connect to MongoDB
async function connectDB() {
	await client.connect();
	console.log('Connected to MongoDB');
	return client.db("coms319");
}

// GET all pets
app.get('/listPets', async (req, res) => {
	try {
	const db = await connectDB();
	const pets = await db.collection('petdoption').find({}).toArray();
	res.status(200).json(pets);
	} catch (err) {
	  console.error(err);
	  res.status(500).send("Error retrieving pets.");
	}
});

// GET pets by multiple fields
app.get('/searchPet', async (req, res) => {
  try {
    const { name, breed, animal, age } = req.query; // Get query parameters
    const filter = {}; // Initialize an empty filter object

    // Dynamically add filters if the query parameter is provided
    if (name) filter.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    if (breed) filter.breed = { $regex: new RegExp(breed, "i") };
    if (animal) filter.animal = { $regex: new RegExp(animal, "i") };
    if (age) filter.age = parseInt(age, 10);

    const db = await connectDB(); // Connect to the database
    const pets = await db.collection('petdoption').find(filter).toArray(); // Query with filters

    if (pets.length > 0) {
      res.status(200).json(pets);
    } else {
      res.status(404).send("No pets found matching the criteria.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving pets.");
  }
});




// app.get('/:petId', async(req, res) => {
// 	try {
// 		const petId = req.params.petId;
// 		console.log('Pet to find:', petId);
// 		const db = await connectDB();
// 		const pet = await db.collection('pet').findOne({ petId: petId });
// 		if (!pet) {
// 			res.status(404).send('Pet not found.');
// 		} else {
// 			res.status(200).send(pet);
// 		}
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send('Error retrieving pet.');
// 	}
// });

// Start server
const port = 8081;
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

// const Pets = () => {
//   const [pets, setPets] = useState([]);

//   // Fetch pets when the component mounts
//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const response = await fetch("http://localhost:8081/listPets");
//         if (!response.ok) throw new Error("Failed to fetch pets.");
//         const data = await response.json();
//         setPets(data);
//       } catch (err) {
//         alert("Error loading pets: " + err.message);
//       }
//     };
//     fetchPets();
//   }, []);

//   return (
//     <div className="container">
//       <h2 className="text-center mt-4">Pets List</h2>
//       <ul className="list-group">
//         {pets.map((pet) => (
//           <li key={pet.petId} className="list-group-item">
//             <strong>{pet.name}</strong> - {pet.breed}
//             <p>{pet.conditions}</p>
//             {pet.picture && (
//               <img
//                 src={pet.picture[0]}
//                 alt={pet.name}
//                 style={{ width: "100px", height: "100px", objectFit: "cover" }}
//               />
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Pets;
