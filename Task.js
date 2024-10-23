const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({                       // creted schema or model for getting string data from user  
    user_id: { type: String, required: true, unique: true },   // record timing when data come
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
