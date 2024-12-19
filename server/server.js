const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db.js");
const userRoutes = require("./routes/usersRoutes.js");
console.log(1);
const app = express();
const PORT = process.env.PORT || 3500;
console.log(2);

// Middleware
app.use(cors());
console.log(3);
app.use(express.json());
console.log(4);

// MongoDB Connection
connectDB();
console.log(5);

// Routes
app.use("/api/users", userRoutes);
console.log(6);

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running!" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
