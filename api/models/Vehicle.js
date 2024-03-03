
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({

    registerNumber:{
        type : String,
        required: true,
    },
    model:{
        type : String,
        required: true,
    },
    type:{
        type : String,
        required: true,

    },
    location:{
        type : String,
        required: true,
    },
    fuelType:{
        type : String,
        required: true,
    }
})

const Vehicle = mongoose.model("Vehicle ",vehicleSchema);

export default Vehicle;
