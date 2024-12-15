const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const personRoutes = require("./routes/personRoutes");

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
connectDB();

// Roures
app.use("/api/people", personRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
