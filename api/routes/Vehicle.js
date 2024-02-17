import express from 'express';
import Vehicle from '../models/Vehicle.js';
const router = express.Router();





router.route("/add").post((req,res)=>{

    const  registerNumber = req.body.registerNumber;
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
})
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
router.route("/get/:id").get(async (req, res) => {
  try {
    const vehiId = req.params.id;
    const vehicle = await Vehicle.findById(vehiId);
    res.status(200).send({ status: "user fetched", vehicle });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "error with get user", error: err.message });
  }
});

export default router;