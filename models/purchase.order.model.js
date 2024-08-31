const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchaseOrderSchema = new Schema({
    poNumber: {
        type: String,
        required: true,
        unique: true,
      },
      vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
      },
      orderDate: {
        type: Date,
        required: true,
      },
      deliveryDate: {
        type: Date,
        required: true,
      },
      items: {
        type: mongoose.Schema.Types.Mixed,
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
        default: null,
      },
      issueDate: {
        type: Date,
        required: true,
      },
      acknowledgmentDate: {
        type: Date,
        default: null,
      },
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;
