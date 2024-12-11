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

// GET pets by multiple fields or a specific pet by petId
app.post('/searchPet', async (req, res) => {
  try {
    const { petId, name, breed, animal, age } = req.body; // Get fields from the request body
    const filter = {}; // Initialize an empty filter object

    // If petId is provided, prioritize it for searching a specific pet
    if (petId) {
      filter.petId = parseInt(petId, 10); // Ensure petId is a number
    } else {
      // Dynamically add filters for other fields
      if (name) filter.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
      if (breed) filter.breed = { $regex: new RegExp(breed, "i") };
      if (animal) filter.animal = { $regex: new RegExp(animal, "i") };
      if (age) filter.age = parseInt(age, 10);
    }

    const db = await connectDB(); // Connect to the database
    const result = petId
      ? await db.collection('petdoption').findOne(filter) // Find one pet if petId is specified
      : await db.collection('petdoption').find(filter).toArray(); // Query for multiple pets otherwise

    if (!result || (Array.isArray(result) && result.length === 0)) {
      res.status(404).send("No pets found matching the criteria.");
    } else {
      res.status(200).json(result); // Send the result(s)
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving pets.");
  }
});



//POST request into the database
app.post('/adoptRequest', async (req, res) => {
  try {
    const { name, phone, email, message, petId } = req.body;
    const db = await connectDB();

    await db.collection('requests').insertOne({
      petId,
      name,
      phone,
      email,
      message,
      timestamp: new Date(),
    });

    res.status(201).send("Request submitted successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing request.");
  }
});

//POST new pet to the database
app.post("/addPet", async (req, res) => {
  try {
    const { name, age, dateOfBirth, breed, animal, conditions, picture } = req.body;

    // Validate required fields
    if (!name || !animal) {
      return res.status(400).send("Name and Animal are required.");
    }

    // Transform and validate fields
    const formattedAge = age ? parseInt(age, 10) : null; // Convert age to an integer if provided
    const formattedConditions = Array.isArray(conditions) ? conditions : [conditions]; // Ensure conditions is an array

    const db = await connectDB();

    // Generate a sequential petId
    const lastPet = await db.collection("petdoption").find().sort({ petId: -1 }).limit(1).toArray();
    const petId = lastPet.length > 0 ? lastPet[0].petId + 1 : 1;

    const newPet = {
      petId,
      name,
      age: formattedAge, // Save age as an integer
      dateOfBirth,
      breed,
      animal,
      conditions: formattedConditions, // Save conditions as an array
      picture,
    };

    const result = await db.collection("petdoption").insertOne(newPet);

    if (result.acknowledged) {
      res.status(201).send("Pet added successfully.");
    } else {
      res.status(500).send("Failed to add pet.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding pet.");
  }
});


//PUT request to adjust a pet's information
app.put("/updatePet", async (req, res) => {
  try {
    const { petId, name, age, dateOfBirth, breed, animal, conditions, picture } = req.body;

    if (!petId || !name || !animal) {
      return res.status(400).send("Pet ID, Name, and Animal are required.");
    }

    const db = await connectDB();
    const result = await db.collection("petdoption").updateOne(
      { petId: parseInt(petId, 10) },
      {
        $set: {
          name,
          age: parseInt(age, 10), // Ensure age is stored as an integer
          dateOfBirth,
          breed,
          animal,
          conditions,
          picture,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.status(200).send("Pet updated successfully.");
    } else {
      res.status(404).send("Pet not found or no changes made.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating pet.");
  }
});

//DELETE a pet from the database
app.delete("/deletePet/:petId", async (req, res) => {
  try {
    const { petId } = req.params;

    if (!petId) {
      return res.status(400).send("Pet ID is required.");
    }

    const db = await connectDB();
    const result = await db.collection("petdoption").deleteOne({ petId: parseInt(petId, 10) });

    if (result.deletedCount > 0) {
      res.status(200).send("Pet deleted successfully.");
    } else {
      res.status(404).send("Pet not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting pet.");
  }
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = [
    { username: "admin", password: "adminPassword123", role: "admin" },
    { username: "user", password: "userPassword123", role: "user" },
  ];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.status(200).json({ role: user.role });
});



// Start server
const port = 8081;
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});


