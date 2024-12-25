const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db.js");
const clientRoutes = require("./routes/clientRoutes.js");
const OfficeRoutes = require("./routes/OfficeRoutes.js");
const authMiddleware = require("./MiddleWares/authMiddleware.js");
const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

// Routes
app.use("/api/clients", authMiddleware, clientRoutes);
app.use("/api/office", OfficeRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
