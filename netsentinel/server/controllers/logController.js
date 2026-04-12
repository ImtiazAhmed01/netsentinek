const Log = require('../models/Log');
const detectionService = require('../services/detectionService');

exports.ingestLog = async (req, res) => {
    try {
        const { ipAddress, method, endpoint, statusCode, userAgent, payload } = req.body;

        const newLog = new Log({ ipAddress, method, endpoint, statusCode, userAgent, payload });
        await newLog.save();

        // Analyze log asynchronously
        detectionService.analyzeLog(newLog, req.io);

        // Emit new log directly for real-time log table
        req.io.emit('new_log_received', newLog);

        res.status(201).json({ message: 'Log ingested successfully', log: newLog });
    } catch (error) {
        res.status(500).json({ message: 'Error ingesting log', error: error.message });
    }
};

exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error: error.message });
    }
};
