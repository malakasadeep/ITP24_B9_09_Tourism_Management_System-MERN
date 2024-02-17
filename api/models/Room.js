import mongoose from "mongoose";

const RoomSchema=new mongoose.Schema({
    title:{
        type:String,  
        required:true
    },    
    price:{ 
        type:Number,   
        required:true 
    },  
    description:{
        type:String,  
        reqiured:true
    },
    maxPeople:{    
        type:Number,
        reqiured:true
    },
    roomNumbers: [{number : Number, unavailableDates :{type: [Date]}}],
    
}) 
const Room =  mongoose.model("Room",RoomSchema)   
export default Room