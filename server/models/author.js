import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
}, { timestamps: true })

export default mongoose.model('Author', authorSchema)