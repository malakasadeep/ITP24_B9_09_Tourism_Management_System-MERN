import mongoose from "mongoose";

const hotelReservationModel=new mongoose.Schema({
    hotelName:{
        type:String,
        required:false
    },
    checkInDate:{
        type:String,
        required:true
    },
    checkOutDate:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true 
    },
    totalPrice:{
        type:String,
        reqiured:true
    },
    totalDays:{
        type:Number,
        reqiured:true
    }
    
    
   
},{timestamps :true}) 

const HotelReservation =  mongoose.model("hotelReservation",hotelReservationModel)  
export default HotelReservation