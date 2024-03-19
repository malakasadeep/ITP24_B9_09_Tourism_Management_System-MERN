import mongoose from "mongoose";

const RestuarantSchema=mongoose.Schema({
    Res_OwnerName : {
        type :String,
        required:true
    },
    Res_Name : {
        type :Number,
        required:true
    },
    Location : {
        type :String,
        required:true
    },
    Description : {
        type :String,
        required:true
    },
    },
    {
        timestamps:true,
    }
);

export const Restuarants=mongoose.model("Restuarant",RestuarantSchema);
