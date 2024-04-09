
import mongoose from "mongoose";
const HotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true 
    },
    hoteltype:{  
        type:String
         
    },
    city:{  
        type:String,
        reqiured:true
    },
    province:{
        type:String,
        reqiured:true
    },
    zip:{
        type:Number,
        reqiured:true
    },
    address:{
        type:String, 
        reqiured:true
    }, 
    distance:{
        type:String, 
        reqiured:true
    },
    contactName:{
        type:String,
        reqiured:true
    },
    contactNo:{
        type:Number,
        reqiured:true
    },
    numberOfRoom:{
        type:Number, 
        reqiured:true 
    },
    HotelImg:{
        type:String}
    , 
    HotelImgs:{ 
        type: [String], 
    },  
    certificates:{ 
        type: [String],
    },
    description:{ 
        type:String,
        reqiured:true
    }, 
    cheapestPrice:{ 
        type:Number,
        reqiured:true 
    },
    rating:{
        type:Number, 
        min:0,
        max:5
    },
    rooms:{
        type: [String],
    },
    sustainability:{
        type: Boolean,
        default: false,
    },
    availableWork:{
        type: Boolean,
        default: false,
    },
    featured:{
        type: Boolean,
        default: true,
    },
  
   
}) 

const hotelListning =  mongoose.model("Hotel",HotelSchema)    

export default hotelListning;


