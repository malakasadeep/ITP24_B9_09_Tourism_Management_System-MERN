import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    ownername: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    regno: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    transmission:{
        type : String,
        required: true,
    },
    capacity:{
        type : Number,
        required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle ", vehicleSchema);

export default Vehicle;
