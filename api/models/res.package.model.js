import mongoose from 'mongoose'

const packageSchema = new mongoose.Schema({
    packageName: { type: String, require: true },
    packageDetails: { type: String, require: true },
    image: { type: String, default: 'https://taj.im/wp-content/uploads/2016/02/default.jpg' },
    packagePrice: { type: Number, require: true },

}, { timestamps: true })

const Package = mongoose.model('ResPackage', packageSchema)
export default Package