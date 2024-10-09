import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    editionNumber: { type: String, required: true, trim: true },
    publicationAt: { type: String, required: true, trim: true },
    eVersion: { type: Boolean, required: true },
    price: { type: String, required: true, trim: true },
    languages: { type: Array, required: true },
    classification: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);