const PurchaseOrderModel = require('../models/purchase.order.model');
const VendorModel = require('../models/vendor.model');

// POST /purchase-orders
const createPurchaseOrder = async (req, res) => {

  try {
    const data = req.body;

    const vendorExists = await VendorModel.findById(data.vendor);
    if (!vendorExists) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const newPurchaseOrder = new PurchaseOrderModel(data);
    await newPurchaseOrder.save();

    return res.status(201).json({
      success: true,
      purchaseOrder: newPurchaseOrder,
    });
  } catch (error) {
    console.error('Error creating purchase order:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating purchase order',
    });
  }
};

// GET /purchase-orders
const listPurchaseOrders = async (req, res) => {

  try {
    const vendorId = req.query.vendor;

    let query = {};
    if (vendorId) {
      query = { vendor: vendorId };
    }

    const purchaseOrders = await PurchaseOrderModel.find(query).populate('vendor');
    return res.status(200).json({
      success: true,
      purchaseOrders,
    });
  } catch (error) {
    console.error('Error listing purchase orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Error listing purchase orders',
    });
  }
};

// controllers/purchaseOrderController.js
const { ObjectId } = require('mongodb');

// GET /purchase-orders/:poId
const getPurchaseOrder = async (req, res) => {

  try {
    const { poId } = req.params;

    if (!ObjectId.isValid(poId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid purchase order ID',
      });
    }

    const purchaseOrder = await PurchaseOrderModel.findById(poId).populate('vendor');

    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found',
      });
    }

    return res.status(200).json({
      success: true,
      purchaseOrder,
    });

  } catch (error) {
    console.error('Error retrieving purchase order:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving purchase order',
    });
  }
};

// PUT /purchase-orders/:poId
const updatePurchaseOrder = async (req, res) => {

  try {
    const { poId } = req.params;
    const data = req.body;

    if (!ObjectId.isValid(poId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid purchase order ID',
      });
    }

    if (data.vendor && !(await VendorModel.findById(data.vendor))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vendor reference',
      });
    }

    const updatedPurchaseOrder = await PurchaseOrderModel.findByIdAndUpdate(poId, data, {
      new: true,
      runValidators: true,
    }).populate('vendor');

    if (!updatedPurchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found',
      });
    }

    return res.status(200).json({
      success: true,
      purchaseOrder: updatedPurchaseOrder,
    });
  } catch (error) {
    console.error('Error updating purchase order:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating purchase order',
    });
  }
};

// DELETE /purchase-orders/:poId
const deletePurchaseOrder = async (req, res) => {

  try {
    const { poId } = req.params;

    if (!ObjectId.isValid(poId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Purchase Order ID',
      });
    }

    const deletedPurchaseOrder = await PurchaseOrderModel.findByIdAndDelete(poId);

    if (!deletedPurchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Purchase Order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting purchase order:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting purchase order',
    });
  }
};


module.exports = {
  createPurchaseOrder,
  listPurchaseOrders,
  getPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
};