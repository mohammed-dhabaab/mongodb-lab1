import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    freelancer: { type: Boolean, default: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
}, { timestamps: true });

export default mongoose.model('Article', articleSchema);