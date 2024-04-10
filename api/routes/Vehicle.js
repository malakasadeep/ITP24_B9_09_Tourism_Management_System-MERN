import express from 'express';
import Vehicle from '../models/Vehicle.js';
const router = express.Router();


router.route("/add").post(async(req,res,next)=>{

    /*const  registerNumber = req.body.registerNumber;
    const  model = req.body.model;
    const  type = req.body.type;
    const  location = req.body.location;
    const  fuelType = req.body.fuelType;

    const newVehicle = new Vehicle({
        registerNumber,
        model,
        type,
        location,
        fuelType
 })

 newVehicle.save().then(()=> {
    res.json("Vehicle Added")
 }).catch((err) =>{
    console.log(err);
})*/

    try {

        const vehicleList = await Vehicle.create(req.body);
        return res.status(201).json(vehicleList);
        
    } catch (error){
        next(error);
        
    }
})

router.get("/", (req, res)=>{
    Vehicle.find().then((Vehicle)=>{
        res.json(Vehicle)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req,res)=>{
    let vehiId =req.params.id;
    const {ownername,brand,model,type,regno,seats,transmission,price,description,location} = req.body;

    const updateVehicle = {
        ownername,
        brand,
        model,
        type,
        regno,
        seats,
        transmission,
        price,
        description,
        location
    }
    const update = await Vehicle.findByIdAndUpdate(vehiId, updateVehicle).then(()=>{
        res.status(200).send({status: "Vehicle updated"})
    }).catch((err)=>{
        res.status(500).send({status: "error with updating data"})
    })
})

router.route("/delete/:id").delete(async (req,res)=>{
    let vehiId = req.params.id;

    await Vehicle.findByIdAndDelete(vehiId).then(()=>{
    res.status(200).send({status: "Vehicle deleted"})
}).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status:"Error with delete vehicle",erroe: err.message});
})
})
router.get("/get-vehi/:id",async (req, res) => {
  try {
    const {id} = req.params;
    const vehicle = await Vehicle.findById(id);
    res.status(200).json( vehicle );
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "error with get user", error: err.message });
  }
});

router.get("/find",async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let type = req.query.type;
        if (type === undefined || type === 'all'){
            type = {$in: ['E-Vehicles', 'Car', 'SUV', 'Van', 'Motor Bike', 'Tuk Tuk', 'Bus']};
        }

        let location = req.query.location;
        if (location === undefined || location === 'all'){
            location = {$in: ['Colombo', 'Galle', 'Matara', 'Mount Lavinia', 'Kandy', 'Katunayake Airport', 'Negombo']};
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const vehi = await Vehicle.find({
            //title: {$regex: searchTerm, $options: 'i'},
            type,
            location,
        })
        .sort({[sort]: order})
        .limit(limit)
        .skip(startIndex);

        return res.status(200).json(vehi);
    } catch (error) {
        next(error);
    }
  });

export default router;