// models/car.js

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: String,
    isElectric: Boolean,
});

const Car = mongoose.model("Car", carSchema); // create model

// models/car.js

module.exports = Car;