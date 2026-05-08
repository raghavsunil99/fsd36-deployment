const mongoose = require("mongoose");

const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://raghav_entri:RaghavEntri123@cluster32762.ah9kpus.mongodb.net/authDB");
    console.log("MongoDB connected")
};

module.exports = connectDB;