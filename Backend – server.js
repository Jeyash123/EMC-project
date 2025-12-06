const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS) from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Fake user (in real apps, use DB + hashed passwords)
const USER = {
  username: "admin",
  password: "password123"
};

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    // send success
    return res.json({ success: true, message: "Login successful!" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
