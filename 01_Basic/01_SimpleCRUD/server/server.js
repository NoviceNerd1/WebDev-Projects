const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to MERN CRUD API" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5006;

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT localhost:${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  server.close(() => process.exit(1));
});
