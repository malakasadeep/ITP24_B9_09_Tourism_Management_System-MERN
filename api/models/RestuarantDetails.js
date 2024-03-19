import mongoose from "mongoose";

const Schema = mongoose.Schema;
const RestuarantSchema=new Schema({
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
})

const Restuarant=mongoose.model("Restuarant",RestuarantSchema);

export default Restuarant;