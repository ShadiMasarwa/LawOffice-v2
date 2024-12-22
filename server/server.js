const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db.js");
// const userRoutes = require("./routes/usersRoutes.js");
const OfficeRoutes = require("./routes/OfficeRoutes.js");
const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

// Routes
// app.use("/api/users", userRoutes);
app.use("/api/office", OfficeRoutes);

// Default Route
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "API is running!" });
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: err.message || "Internal Server Error" });
// });

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
