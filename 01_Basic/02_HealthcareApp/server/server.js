const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/patients", patientRoutes);

// Basic Test routes
app.get("/", (req, res) => {
  res.send("Healthcare API is running");
});

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});
