const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const path = require("path");

dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Import and use the user route
const userRoute = require("./routes/userRoute");
app.use("/api/users", userRoute);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("🔌 Connected to the Database");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on Port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "/nasa-app/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/nasa-app/dist/index.html"));
});

module.exports = app;
