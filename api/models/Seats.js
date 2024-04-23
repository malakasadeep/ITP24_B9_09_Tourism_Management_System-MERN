import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    trainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    // You can add more properties as needed
});

const Seat = mongoose.model('Seat', seatSchema);

export default Seat;
