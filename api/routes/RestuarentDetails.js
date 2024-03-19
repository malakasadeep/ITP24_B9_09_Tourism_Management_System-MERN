import express from 'express';
import Restuarant from '../models/RestuarantDetails.js';
const router = express.Router();

//insert a restuarant
router.route("/add").post((req,res)=>{
   
    const Res_OwnerName=req.body.Res_OwnerName;
    const Res_Name=req.body.Res_Name;
    const Location=req.body.Location;
    const Description=req.body.Description;

    const newRestuarant=new Restuarant({
        Res_OwnerName,
        Res_Name,
        Location,
        Description,
    })
    //error or not
    newRestuarant.save().then(()=>{
        res.json("Restuarant added")
    }).catch((err)=>{
        console.log(err);
    })
})
//read
//calling backend url
router.route("/").get((req,res)=>{
    //get all records
    Restuarant.find().then((Restuarants)=>{
        res.json(Restuarants)
    }).catch((err)=>{
        console.log(err);
    })  
})
 
//update Restuarant Details
router.route("/update/:id").put(async(req,res)=>{
  let ResId=res.params.id;

  const{Res_OwnerName,Res_Name,Location,Description}=req.body;

  const updateRestuarant ={
    Res_OwnerName,
    Res_Name,
    Location,
    Description,
  }
  
  const update=await Restuarant.findByIdAndUpdate(ResId,updateRestuarant).then(()=>{
  res.status(200).send({status: " Restuarant updated",Restuarant:update})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error found updating",error:err.message});
})

  
})

router.route("/delete/:id").delete(async(req,res)=>{
    let ResId=req.params.id;

    await Restuarant.findByIdAndDelete(ResId)
    .then(()=>{
       res.status(200).send({status:"Error found deleting",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let ResId=req.params.id;
     const ResOwner =await Restuarant.findById(ResId)
    .then(()=>{
        res.status(200).send({status: "Restuarant feched",ResOwner:ResOwner})
    }).catch(()=>
    {console.log(err.message).send({status:"Error with get user",error:errr.message});
   })
})




export default router;