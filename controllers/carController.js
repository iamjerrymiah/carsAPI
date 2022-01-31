const Car = require('./../models/carModel');

exports.getAllCars = async (req,res)=>{ //Read all the documents in the DB
    try {
        //Build Query
        //(1 Filtering[filters for equals to]
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el=> delete queryObj[el]); //looping through queryObj to remove excludedFields

        //(2 Advanced filtering[filters for gte|lte|lt|gt]
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=> `$${match}`);//A expression use to add $ to the front of gte|lte

        let query = Car.find(JSON.parse(queryStr));

        //(3 Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' '); 
            query = query.sort(sortBy);
        }else{
            query = query.sort('-createdAt');
        }

        //Executing query
        const cars = await query;

        //SEnd REsponse
        res.status(200).json({
            status: 'success',
            results: cars.length,
            data:{
                cars
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'error'
        })
    }
};

exports.createCar = async (req,res)=>{
    try {
   const newCar = await Car.create(req.body); //creating a document in the DB
   res.status(201).json({
       status:'success',
       data: {
           car: newCar
       }
   });
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message: error
        })
    }
};

exports.getOneCar = async (req,res)=>{
    try {
        const car = await Car.findById(req.params.id);//finding a document with the id
        
        res.status(200).json({
            status: 'success',
            data:{
                car
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'error'
            })
        }
    };

exports.updateCar = async (req, res) => {
    try {
      const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          car
        }
      })
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error
      })
    }
  };

exports.deleteCar = async (req,res)=>{
    try {
        await Car.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            data: null
          })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
          })
    }
};