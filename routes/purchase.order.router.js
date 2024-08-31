const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchase.order.controller');

router.post('/',purchaseOrderController.createPurchaseOrder)
router.get('/',purchaseOrderController.listPurchaseOrders)
router.get('/:poId',purchaseOrderController.getPurchaseOrder)
router.put('/:poId',purchaseOrderController.updatePurchaseOrder)
router.delete('/:poId',purchaseOrderController.deletePurchaseOrder)

module.exports = router;