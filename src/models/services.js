const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    title: String,
    description: String,
    iconName: String,
});

module.exports = mongoose.model('Service', serviceSchema);