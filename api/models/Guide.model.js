import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      requird: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    NIC: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      //required: true,
    },
  },
  { timestamps: true }
);

const Guide = mongoose.model("Guide", guideSchema);
export default Guide;
