const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
    method: { type: String, required: true }, // GET, POST
    endpoint: { type: String, required: true }, // /api/login
    statusCode: { type: Number, required: true }, // 200, 404, 500
    userAgent: { type: String },
    payload: { type: Object } // Optional: RAW Request JSON
});

module.exports = mongoose.model('Log', logSchema);
