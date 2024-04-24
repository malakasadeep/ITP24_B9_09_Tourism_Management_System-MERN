import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
    ownerName: { type: String, require: true },
    restaurantName: { type: String, require: true },
    location: { type: String, require: true, },
    image: { type: String, default: 'https://taj.im/wp-content/uploads/2016/02/default.jpg' },
    description: { type: String },

}, { timestamps: true })

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
export default Restaurant