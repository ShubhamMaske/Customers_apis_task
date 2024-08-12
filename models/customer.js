
import mongoose from "mongoose";

const Schema = mongoose.Schema

const customerSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: 'Ahmedabad'
    },
    company: {
        type: String,
        default: 'SublimeDataSystems'
    }
}, {timestamps: false})

export default mongoose.model('Customer', customerSchema, 'customers')