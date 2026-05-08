const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173"
}));

connectDB();

app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});