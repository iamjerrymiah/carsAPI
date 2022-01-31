const mongoose = require('mongoose');
const slugify = require('slugify');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A car must have a name'],
        unique: true, //make teh name to be unique
        trim: true,  //to cut out white space from the front/back of an input
        maxlength: [40, 'A car name must have less or equal then 40 characters'],
        minlength: [2, 'A car name must have more or equal then 10 characters']
    }, 
    brand: {
        type: String,
        required: [true, 'A car must have a Brand'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'A car must have a price']
    },
    history: {
        type: String,
        trim: true
    },
    createdAt:{  //Time when the user created a car
        type: Date,
        default: Date.now(),
        select:false 
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    slug: String,
    startDates: [Date]
});

const Car = mongoose.model('Car', carSchema);//mongoose model

module.exports = Car;