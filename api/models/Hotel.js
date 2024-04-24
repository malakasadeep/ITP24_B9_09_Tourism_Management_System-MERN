
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
    type:{  
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
    hotelImgs:{ 
        type: Array, 
    },  
  
    description:{ 
        type:String,
        reqiured:true
    }, 
    price:{ 
        type:Number,
        reqiured:true 
    },
    rating:{
        type:Number, 
        min:0,
        max:5
    },
  
    availableWork:{
        type: String,
        reqiured:true 
    },
    featured:{
        type: Boolean,
        default: true,
    },
    roomtype: {
        type: [String, Array], 
        required: true
    }
    
  
   
}) 

const hotelListning =  mongoose.model("Hotel",HotelSchema)    

export default hotelListning;


