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
    const {registerNumber,model,type,location,fuelType} = req.body;

    const updateVehicle = {
        registerNumber,
        model,
        type,
        location,
        fuelType
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

export default router;