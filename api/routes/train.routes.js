import express from 'express';
import train from "../models/train.js";
const router = express.Router();

router.route("/add").post(async (req,res)=>{


    try {
        const newTrain = await train.create(req.body);
        return res.status(201).json(newTrain);
    } catch (error) {
        console.log(error);
    }

    /*const trainName = req.body.trainName;
    const arrivalTime = req.body.arrivalTime;
    const departureTime = req.body.departureTime;
    const departureStations = req.body.departureStations;
    const destination = req.body.destination;

    const newTrain = new train({

        trainName,
        arrivalTime,
        departureTime,
        departureStations,
        destination
    })

    newTrain.save().then(()=>{
        res.json("Train Added")
    }).catch((err)=>{
        console.log(err);
    })*/

})

router.route("/").get((req,res)=>{
    train.find().then((trains)=>{
        res.json(trains)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res, next)=> {
    /*let trainId = req.params.id;
    const {trainName,arrivalTime,departureTime,departureStations,destination} = req.body;
    const updateTrain = {
        trainName,
        arrivalTime,
        departureTime,
        departureStations,
        destination
    }
    const update = await train.findByIdAndUpdate(trainId,updateTrain).then(()=>{
        res.status(200).send({status: "Train updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })*/
    const traindetails = await train.findById(req.params.id);

    if (!traindetails) {
        return next(errorHandler(404, 'Package not found'));
    }
    try {
        const updatetrain = await train.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatetrain)
    } catch (error) {
        next(error);
    }
})
 
router.route("/delete/:id").delete(async(req,res)=>{
    let trainId = req.params.id;

    await train.findByIdAndDelete(trainId).then(()=>{
        res.status(200).send({status: "Train deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete train",error: err.message});
    })

})

router.route("/get/:id").get(async(req,res)=>{
    //let trainId = req.params.id;


    try {
        const trainId = req.params.id;
        const traindetails = await train.findById(trainId);
        res.status(200).send({ status: "user fetched", traindetails });
      } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "error with get user", error: err.message });
      }

    /*await train.findById(trainId).then(()=>{
        res.status(200).json({status: "Train fetched",train})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get train", error: err.message});
    })*/
})


router.route("/search").get ( async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let category = req.query.category;
        if (category === undefined || category === 'all'){
            category = {$in: ['Express', 'Intercity', 'Slow']};
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const users = await train.find({
            trainName: {$regex: searchTerm, $options: 'i'},
            category,
        })
        .sort({[sort]: order})
        .limit(limit)
        .skip(startIndex);

        return res.status(200).json(users);

    } catch (error) {
        next(error);
    }
});

export default router
