const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();

//--------------------------------------------- SQL Connection -------------------------------------------------------//
// Configure the MySQL connection to the database (secoms3190) in backend.
const mysql = require("mysql2");

// Set up MySQL connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "phuong", // Your MySQL username
  password: "Phuong123!", // Your MySQL password
  database: "secoms3190", // The database to connect to
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database!");
  }
});

//----------------------------------------------- Multer Config ------------------------------------------------------//
// Set up file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
  },
});

const upload = multer({ storage: storage });

// Create "uploads" folder if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

//------------------------------------------------- Express ----------------------------------------------------------//
// Middleware in App.js to handle JSON requests and serve static files.
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON requests
app.use(express.json()); // Alternative for JSON parsing
//app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res, path) => {
      console.log(`Serving file: ${path}`); // This will log each file request
    },
  })
);

//----------------------------------------------- GET Contacts -------------------------------------------------------//
// Endpoint to fetch all contacts from the contact table.
app.get("/contact", (req, res) => {
  try {
    db.query("SELECT * FROM contact", (err, result) => {
      if (err) {
        console.error("Error reading contacts:", err);
        return res.status(500).send({ error: "Error reading contacts" });
      }
      res.status(200).send(result); // Send the contacts as the response
    });
  } catch (err) {
    console.error("An unexpected error occurred", err);
    res.status(500).send({ error: "An unexpected error occurred" });
  }
});

//----------------------------------------------- GET Contacts -------------------------------------------------------//
//get queries from clients
app.get("/contact/name", (req, res) => {
  const { contact_name } = req.query;
  // Validate if contact_name is provided
  if (!contact_name) {
    return res.status(400).send({ error: "contact_name is required" });
  }

  try {
    // Query to search for exact or partial matches, case sensitive
    const query =
      "SELECT * FROM contact WHERE LOWER(contact_name) LIKE LOWER(?)";
    const searchValue = `%${contact_name}%`; // Add wildcards for partial match
    db.query(query, [searchValue], (err, result) => {
      if (err) {
        console.error("Error fetching contacts:", err);
        return res.status(500).send({ error: "Error fetching contacts" });
      }
      res.status(200).send(result);
    });
  } catch (err) {
    console.error({
      error: "An unexpected error occurred in GET by name" + err,
    });
    res
      .status(500)
      .send({ error: "An unexpected error occurred in GET by name" + err });
  }
});

//create an admin account
app.post("/contact/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required." });
  }
  try {
    // Query MySQL
    const query = "SELECT role FROM user WHERE user = ? AND password = ?";

    // Query MySQL
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error("Database error during login:", err);
        return res
          .status(500)
          .send({ error: "An error occurred in Query. Please try again." });
      }
      if (results.length === 0) {
        return res.status(401).send({ error: "Invalid username or password." });
      }
      // If there is not any error, respond with code and role
      const { role } = results[0];
      res.status(200).send({ role });
    });
  } catch (err) {
    // Handle synchronous errors
    console.error("Error in GET /contact/login", err);
    res
      .status(500)
      .send({ error: "An unexpected error occurred in Login: " + err.message });
  }
});

//new message method
// Request Method to add new messages given a Contact
app.post("/contact/messages", (req, res) => {
  // Read data from Body
  const { contactId, message } = req.body;
  // Query MySQL
  const query =
    "INSERT INTO message (contact_id, message, message_timestamp) VALUES (?, ?, NOW())";
  try {
    db.query(query, [contactId, message], (err, results) => {
      if (err) {
        // In case of an error occurs
        console.log("Error in /contact/messages " + err);
        res.status(409).send({ error: "Error adding Messages " + err });
      } else {
        // If it was successful
        res.status(201).send("Message added successfully");
      }
    });
  } catch (err) {
    console.err("Error in /contact/messages " + err);
    res.status(500).send({ error: "Error sending message" + err });
  }
});

// Request method to read all messages from given Id contact
app.get("/contact/messages/:contactId", (req, res) => {
  // Read Id from params
  const { contactId } = req.params;
  // MySQL Query
  const query =
    "SELECT * FROM message WHERE contact_id = ? ORDER BY message_timestamp DESC";
  try {
    // Database query
    db.query(query, [contactId], (err, results) => {
      if (err) {
        console.error("Error fetching Messages:", err);
        return res.status(500).send({ error: "Error fetching Messages" + err });
      }
      console.log(results);
      res.status(200).json(results);
    });
  } catch (err) {
    res.status(500).send({ error: "Error fetching messages", err });
  }
});

// Request method to read the picture user
app.get("/contact/profile_picture/:contact_name", (req, res) => {
  // Read contact_name from route parameter
  const contact_name = req.params.contact_name;

  // MySQL Query
  const query = "SELECT image_url FROM contact WHERE contact_name = ?";

  try {
    db.query(query, [contact_name], (err, result) => {
      if (err) {
        console.log({ error: "Error in Profile Picture" });
        return res
          .status(500)
          .send({ error: "Error fetching Profile Picture :" + err });
      } else if (result.length) {
        console.log(result);
        res.json({ picture: result[0].image_url }); // return local url
      } else {
        res.status(404).send({ error: "Profile picture not found" });
      }
    });
  } catch (err) {
    console.error("Error fetching profile picture:", err);
    res.status(500).send({ error: "Error fetching profile picture :" + err });
  }
});

//----------------------------------------------- Post Contact  ------------------------------------------------------//
// Endpoint to add a new contact to the contact table, including handling image uploads.
app.post("/contact", upload.single("image"), (req, res) => {
  const { contact_name, phone_number, message } = req.body;

  // Check if the contact_name already exists in the database
  const checkQuery = "SELECT * FROM contact WHERE contact_name = ?";
  db.query(checkQuery, [contact_name], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Database error during validation:", checkErr);
      return res
        .status(500)
        .send({ error: "Error checking contact name: " + checkErr.message });
    }

    if (checkResult.length > 0) {
      return res.status(409).send({ error: "Contact name already exists." });
    }

    // Handle image URL
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // If an image is uploaded, save the filename

    // Log the request to debug the issue
    console.log("Request Body:", req.body); // Log request body
    console.log("Uploaded File:", req.file); // Log file info

    // Insert the new contact into the database
    const query =
      "INSERT INTO contact (contact_name, phone_number, message, image_url) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [contact_name, phone_number, message, imageUrl],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Error adding contact: " + err });
        } else {
          res.status(201).send("Contact added successfully");
        }
      }
    );
  });
});

//----------------------------------------------- Delete Contact  ------------------------------------------------------//

app.delete("/contact/:id", (req, res) => {
  //read parameter
  const id = req.params.id;
  try {
    const query = "DELETE FROM contact WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ err: "Error deleting contact" });
      } else if (result.affectedRows === 0) {
        res.status(404).send({ err: "Contact not found" });
      } else {
        res.status(200).send("Contact deleted successfully");
      }
    });
  } catch (err) {
    // Handle synchronous errors
    console.error("Error in DELETE /contact:", err);
    res.status(500).send({
      error: "An unexpected error occurred in DELETE: " + err.message,
    });
  }
});

//----------------------------------------------- Update Contact  ------------------------------------------------------//

app.put("/contact/:id", (req, res) => {
  //get id from client
  const id = req.params.id;
  try {
    const query = `
        UPDATE contact
        SET contact_name = ?, phone_number = ?, message = ?
        WHERE id = ?`;
    db.query(
      query,
      [contact_name, phone_number, message, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ err: "Error updating contact" });
        } else if (result.affectedRows === 0) {
          res.status(404).send({ err: "Contact not found" });
        } else {
          res.status(200).send("Contact updated successfully");
        }
      }
    );
  } catch {
    // Handle synchronous errors
    console.error("Error in UPDATE /contact:", err);
    res.status(500).send({
      error: "An unexpected error occurred in UPDATE: " + err.message,
    });
  }
});

//----------------------------------------------- Start Server -------------------------------------------------------//
const PORT = 8081; // Port for the server to listen on
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
