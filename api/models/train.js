import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trainSchema = new Schema({

    trainName : {
        type:String,
        required: true
    },
    arrivalTime : {
        type:String,
        required: true
    },
    departureTime : {
        type:String,
        required: true
    },
    departureStaitons : {
        type:String,
        required: true
    },
    destination : {
        type:String,
        required: true
    }
})

const train = mongoose.model("train",trainSchema);

export default train