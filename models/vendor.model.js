const mongoose = require('mongoose');  

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactDetails: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    vendorCode: {
        type: String,
        required: true
    },
    onTimeDeliveryRate: {
        type: Number,
        required: true
    },
    qualityRatingAvg: {
        type: Number,
        required: true
    },
    averageResponseTime: {
        type: Number,
        required: true
    },
    fulfillmentRate: {
        type: Number,
        required: true
    },
});

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;  