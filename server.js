const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const nodeMailer = require("./nodeMailer");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection

connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
//static files
app.use(express.static(path.join(__dirname, "./Client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./Client/build/index.html"));
});
// Endpoint to handle email sending
app.use(nodeMailer);

// Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
