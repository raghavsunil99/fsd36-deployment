const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");

require("dotenv").config();

// const connectDB = require("./config/db");
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"));

const authRoutes = require("./routes/authRoutes");

app.use(express.json());
// app.use(cors());

app.use(cors({
  origin:"https://stately-biscochitos-9e25de.netlify.app/"
}));

// connectDB();

app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});