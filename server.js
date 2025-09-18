const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const studentRoutes = require("./routes/students.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
