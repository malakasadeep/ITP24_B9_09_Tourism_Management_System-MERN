import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trainSchema = new Schema({

    trainName : {
        type:String,
        required: true
    },
    category : {
        type:String,
        required: true
    },
    class : {
        type:String,
        required: true
    },
    from : {
        type:String,
        required: true
    },
    departureTime : {
        type:String,
        required: true
    },
    destination : {
        type:String,
        required: true
    },
    arrivalTime : {
        type:String,
        required: true
    },
    type : {
        type:String,
        required: true
    },
    noofseats : {
        type:String,
        required: true
    },
    description : {
        type:String,
        required: true
    }
})

const train = mongoose.model("train",trainSchema);

export default train