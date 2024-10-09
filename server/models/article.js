import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    freelancer: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Article', articleSchema);