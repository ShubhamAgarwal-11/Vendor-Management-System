const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchaseOrderSchema = new Schema({
    poNumber: {
        type: String,
        required: true,
        unique: true,
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    deliveryDate: {
        type: Date,
    },
    items: {
        type: Object,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'canceled'],
    },
    qualityRating: {
        type: Number,
        min: 0,
        max: 5,
        default: null,
    },
    issueDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    acknowledgmentDate: {
        type: Date,
        default: null,
    },
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;
