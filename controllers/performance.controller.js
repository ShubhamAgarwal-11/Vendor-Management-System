const { PurchaseOrder } = require('../models/purchase.order.model');
const { VendorModel } = require('../models/vendor.model');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {

  try {
    const url = new URL(req.url);
    const vendorId = url.searchParams.get('vendor');

    if (!vendorId || !ObjectId.isValid(vendorId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vendor ID',
      });
    }

    const vendor = await VendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const purchaseOrders = await PurchaseOrder.find({ vendor: vendorId });

    if (purchaseOrders.length === 0) {
      return res.status(200).json({
        success: true,
        metrics: {
          onTimeDeliveryRate: 0,
          qualityRatingAverage: 0,
          averageResponseTime: 0,
          fulfillmentRate: 0,
        },
      });
    }

    const totalOrders = purchaseOrders.length;
    let onTimeDeliveries = 0;
    let totalQualityRating = 0;
    let totalResponseTime = 0;
    let fulfilledOrders = 0;

    purchaseOrders.forEach(order => {
      if (order.deliveryDate <= order.promisedDate) onTimeDeliveries++;
      if (order.qualityRating) totalQualityRating += order.qualityRating;
      if (typeof order.acknowledgmentDate === 'string' && typeof order.orderDate === 'string') {
        totalResponseTime += Number(((new Date(order.acknowledgmentDate) - new Date(order.orderDate)) / (1000 * 60 * 60))); // in hours
      }
      if (order.fulfilled) fulfilledOrders++;
    });

    const onTimeDeliveryRate = (onTimeDeliveries / totalOrders) * 100;
    const qualityRatingAverage = totalQualityRating / totalOrders;
    const averageResponseTime = totalResponseTime / totalOrders;
    const fulfillmentRate = (fulfilledOrders / totalOrders) * 100;

    return res.status(200).json({
      success: true,
      metrics: {
        onTimeDeliveryRate,
        qualityRatingAverage,
        averageResponseTime,
        fulfillmentRate,
      },
    });
  } catch (error) {
    console.error('Error retrieving vendor performance metrics:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving vendor performance metrics',
    });
  }
});

router.post('/:poId', async (req, res) => {
  await dbConnect();

  try {
    const { acknowledgmentDate } = req.body;
    const poId = req.params.poId;

    if (!poId || !ObjectId.isValid(poId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid purchase order ID',
      });
    }

    const purchaseOrder = await PurchaseOrder.findById(poId);
    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found',
      });
    }

    purchaseOrder.acknowledgmentDate = acknowledgmentDate;
    await purchaseOrder.save();
    const vendor = await VendorModel.findById(purchaseOrder.vendor);
    if (vendor) {
      const purchaseOrders = await PurchaseOrderModel.find({ vendor: vendor._id });
      let totalResponseTime = 0;
      let totalOrders = 0;

      purchaseOrders.forEach(order => {
        if (order.acknowledgmentDate && order.orderDate) {
          totalResponseTime += Number(((new Date(order.acknowledgmentDate) - new Date(order.orderDate)) / (1000 * 60 * 60))); // in hours
          totalOrders++;
        }
      });

      const averageResponseTime = totalOrders ? totalResponseTime / totalOrders : 0;
      vendor.averageResponseTime = averageResponseTime;
      await vendor.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Acknowledgment date updated successfully',
    });
  } catch (error) {
    console.error('Error updating acknowledgment date:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating acknowledgment date',
    });
  }
});

