const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

// Middleware to parse form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

// Explicit route for home page ( / )
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Fake user (for testing only)
const USER = {
  username: "admin",
  password: "password123"
};

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    return res.json({ success: true, message: "Login successful!" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
