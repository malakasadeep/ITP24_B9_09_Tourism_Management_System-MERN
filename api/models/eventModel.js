import mongoose from "mongoose";

const Schema = mongoose.Schema

const eventSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    participants: {
        type: Number,
        required: false,
        default: 0
    }
}, {timestamps: true})

const Event = mongoose.model('Event&Activity', eventSchema);
export default Event;
