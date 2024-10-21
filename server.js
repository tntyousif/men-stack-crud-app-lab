const express = require("express");
require('dotenv').config();
const morgan = require('morgan');
const methodOverride = require("method-override"); // new
// Import the Car model
const Car = require("./models/car.js");

const path = require("path");

const mongoose = require("mongoose");

//importing from controller/cars.js
const carsCtrl = require('./controllers/cars')

const app = express(); 
app.use(morgan('dev'));
app.use(methodOverride("_method")); // new
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// server.js
// GET homepage
app.get('/', async (req, res) => {
    res.render('index.ejs')
})
  
// GET /cars (Read - Index)
app.get('/cars', carsCtrl.index)
  
// GET /cars/new (New form)
app.get('/cars/new', carsCtrl.new)
  
// DELETE /cars/:carId (Delete)
app.delete('/cars/:carId', carsCtrl.delete)
  
// GET /cars/:carId (Read - Show)
app.get('/cars/:carId', carsCtrl.show)
  
// POST /cars (Create)
app.post('/cars', carsCtrl.create)
  
// GET /cars/:carId/edit
app.get('/cars/:carId/edit', carsCtrl.edit)
  
app.put('/cars/:carId', carsCtrl.update)
  
app.listen(3000, () => {
    console.log('Listening on port 3000')
})