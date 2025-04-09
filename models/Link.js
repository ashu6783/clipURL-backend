import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  alias: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clicks: [{
    ip: String,
    device: String,
    timestamp: Date,
  }],
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Link = mongoose.model('Link', linkSchema);

export default Link;
