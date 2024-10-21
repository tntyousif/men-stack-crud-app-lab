const Car = require('../models/car.js')

const index = async (req, res) => {
    const allCars = await Car.find();
    res.render("cars/index.ejs", { cars: allCars });
}


const newCar = (req, res) => {
    res.render('cars/new.ejs')
}
  
const create = async (req, res) => {
      //   convert this "on" or undefined value to a Boolean
      const formData = req.body
      if (req.body.isElectric === 'on') {
        formData.isElectric = true
      } else {
        formData.isElectric = false
      }
    
      //   Create car in database
      await Car.create(formData)
    
      //   redirect the user back to the form page
      res.redirect('/cars')
}
  
const show = async (req, res) => {
      const foundCar = await Car.findById(req.params.carId)
      res.render('cars/show.ejs', { car: foundCar })
}
  
const deleteCar = async (req, res) => {
      await Car.findByIdAndDelete(req.params.carId)
      res.redirect('/cars')
}
  
const edit = async (req, res) => {
      const foundCar = await Car.findById(req.params.carId)
      console.log(foundCar)
      res.render('cars/edit.ejs', { car: foundCar })
}
  
const update = async (req, res) => {
      //   convert this "on" or undefined value to a Boolean
      const formData = req.body
      if (req.body.isElectric === 'on') {
        formData.isElectric = true
      } else {
        formData.isElectric = false
      }
      await Car.findByIdAndUpdate(req.params.carId, formData)
      res.redirect(`/cars/${req.params.carId}`)
}

module.exports = {
    index,
    new: newCar,
    create,
    show,
    delete: deleteCar,
    edit, 
    update,
}