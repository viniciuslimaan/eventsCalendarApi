const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    author: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Event', EventSchema);