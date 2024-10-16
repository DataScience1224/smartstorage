const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Temporary user database (for now just an array)
const users = [];

// POST: /register - Register new user
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation (you can expand this)
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Add new user to the database
    const newUser = { name, email, password };
    users.push(newUser);

    console.log("Registered Users:", users);

    res.status(201).json({ message: "User registered successfully!" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
