import express from 'express';
import train from "../models/train.js";
import Seat from "../models/seats.js";
const router = express.Router();

router.route("/add").post(async (req,res)=>{


    const {
        trainName,
        category,
        class: trainClass,
        from,
        departureTime,
        destination,
        arrivalTime,
        type,
        noofseats,
        description,
        price
    } = req.body;

    try {
        // Create train document
        const newtrain = new train({
            trainName,
            category,
            class: trainClass,
            from,
            departureTime,
            destination,
            arrivalTime,
            type,
            noofseats,
            description,
            price
        });

        // Save train to database
        const savedTrain = await newtrain.save();

        // Generate seats and insert into database
        const seats = [];
        for (let i = 1; i <= noofseats; i++) {
            const seat = new Seat({
                trainId: savedTrain._id,
                seatNumber: i,
                availability: true,
                // You can add more properties as needed
            });
            seats.push(seat);
        }
        await Seat.insertMany(seats);

        res.json({ success: true, message: 'Train and seats added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

})

router.route("/").get((req,res)=>{
    train.find().then((trains)=>{
        res.json(trains)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res, next)=> {
    
    const {
        trainName,
        category,
        class: trainClass,
        from,
        departureTime,
        destination,
        arrivalTime,
        type,
        noofseats,
        description,
        price
    } = req.body;
    
    try {
        // Find the existing train document by ID
        const existingTrain = await train.findById(req.params.id);
    
        if (!existingTrain) {
            return res.status(404).json({ success: false, message: 'Train not found' });
        }
    
        // Update train document with new information
        existingTrain.trainName = trainName;
        existingTrain.category = category;
        existingTrain.class = trainClass;
        existingTrain.from = from;
        existingTrain.departureTime = departureTime;
        existingTrain.destination = destination;
        existingTrain.arrivalTime = arrivalTime;
        existingTrain.type = type;
        existingTrain.noofseats = noofseats;
        existingTrain.description = description;
        existingTrain.price = price;
    
        // Save the updated train document
        const updatedTrain = await existingTrain.save();
    
        // Delete existing seats associated with the train
        await Seat.deleteMany({ trainId: req.params.id });
    
        // Generate and insert new seats
        const seats = [];
        for (let i = 1; i <= noofseats; i++) {
            const seat = new Seat({
                trainId: req.params.id,
                seatNumber: i,
                availability: true // Set availability as needed
            });
            seats.push(seat);
        }
        await Seat.insertMany(seats);
    
        res.json({ success: true, message: 'Train and seats updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})
 
router.route("/delete/:id").delete(async (req, res) => {
    try {
        let trainId = req.params.id;

        // Delete the train document
        await train.findByIdAndDelete(trainId);

        // Delete associated seats
        await Seat.deleteMany({ trainId });

        res.status(200).send({ status: "Train and associated seats deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete train", error: err.message });
    }
});


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

        let category = req.query.type;
        let from = req.query.from
        let destination = req.query.destination
        if (category === undefined || category === 'all'){
            category = {$in: ['Express', 'Intercity', 'Slow']};
        }
        if (from === undefined || from === 'all'){
            from = {$in: ['Colombo Fort', 'Galle', 'Matara', 'Badulla', 'Hatton','Batticaloa', 'Vavuniya']};
        }
        if (destination === undefined || destination === 'all'){
            destination = {$in: ['Colombo Fort', 'Galle', 'Matara', 'Badulla', 'Hatton','Batticaloa', 'Vavuniya']};
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const users = await train.find({
            trainName: {$regex: searchTerm, $options: 'i'},
            from,
            destination,
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

router.get('/seats/:trainID', async (req, res) => {
    const trainID = req.params.trainID;

    try {
        // Find all seats associated with the trainID
        const seats = await Seat.find({ trainId: trainID });

        // Respond with the seat information
        res.json({ success: true, seats: seats });
    } catch (error) {
        // If an error occurs, respond with an error message
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route to book seats for a train
router.post('/book-seats/:trainID', async (req, res) => {
    const trainID = req.params.trainID;
    const selectedSeats = req.body.selectedSeats;

    // Check if selectedSeats is an array
    if (!Array.isArray(selectedSeats)) {
        return res.status(400).json({ success: false, message: 'selectedSeats must be an array' });
    }

    try {
        // Loop through each selected seat and update its availability
        for (const seat of selectedSeats) {
            const updatedSeat = await Seat.findOneAndUpdate(
                { trainId: trainID, seatNumber: seat.seatNumber },
                { $set: { available: false } }, // Set availability to false (booked)
                { new: true } // Return the updated document
            );

            if (!updatedSeat) {
                return res.status(404).json({ success: false, message: 'Seat not found' });
            }
        }

        // Generate receipt data (you can customize this based on your requirements)
        const receiptData = {
            trainID: trainID,
            bookedSeats: selectedSeats.map(seat => seat.seatNumber),
            totalPrice: selectedSeats.length * singleTrain.price // Assuming singleTrain contains the price
            // Add more receipt data as needed
        };

        // Respond with success message and receipt data
        res.json({ success: true, message: 'Seats booked successfully', receipt: receiptData });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to book seats. Please try again later.' });
    }
});

export default router
