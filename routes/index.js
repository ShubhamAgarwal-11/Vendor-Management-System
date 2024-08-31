const express = require("express");
const router = express.Router();
const vendorController = require('../controllers/vendor.controller')

router.post('/',vendorController.createVendor)
router.get('/',vendorController.getVendor)
router.get('/:id',vendorController.getSpecificVendor)
router.put('/:id',vendorController.updateVendorDetails)
router.delete('/:id',vendorController.deleteVendor)

module.exports = router