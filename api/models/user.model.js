import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,    
    },
    lastname: {
        type: String,    
    },
    username: {
        type: String,
        required: true,
        unique: true,    
    },
    email: {
        type: String,
        required: true,
        unique: true,    
    },
    country: {
        type: String,   
    },
    password: {
        type: String,
        required: true,   
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dgckCEFdaR4QrzY1cdQTF_VzmwmPkSV2UA&usqp=CAU"
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;