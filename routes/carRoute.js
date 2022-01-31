const express = require('express');
const carController = require('./../controllers/carController');
const router = express.Router();

router
.route('/')
.get(carController.getAllCars)
.post(carController.createCar);  //simplified way of routing

router
.route('/:id')
.get(carController.getOneCar)
.patch(carController.updateCar)
.delete(carController.deleteCar);

module.exports = router;