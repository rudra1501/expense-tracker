import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    amount: {type: Number, required: true },
    source: {type: String, required: true},
    description: {type: String},
    date: {type: Date, default: Date.now},
}, {timestamps: true});

incomeSchema.index({ userId: 1, date: -1});
incomeSchema.index({ userId: 1, source: 1});

export default mongoose.model('Income', incomeSchema);