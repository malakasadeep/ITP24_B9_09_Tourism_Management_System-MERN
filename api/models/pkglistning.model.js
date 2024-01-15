import mongoose from "mongoose";

const pkglistningSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        offerprice: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        itinerary: {
            type: Number,
            required: true,
        },
        days: {
            type: Number,
            required: true,
        },
        noofhotels: {
            type: Number,
            required: true,
        },
        noofactivities: {
            type: Number,
            required: true,
        },
        hoteltype: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        citys: {
            type: String,
            required: true,
        },
        specialactivities: {
            type: String,
            required: true,
        },
        policy: {
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

const PkgListning = mongoose.model("PkgListning", pkglistningSchema);

export default PkgListning;