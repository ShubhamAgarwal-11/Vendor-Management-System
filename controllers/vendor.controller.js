const Vendor = require('../models/vendor.model')
const createVendor = async (req, res) => {
    try {
        const { name, contactDetails, address } = req.body;
        if(!name || !contactDetails || !address) {
            return res.status(400).json({
                success : false,
                message : "Please provide name, contact and address"
            })
        }
        // TODO
        const vendor = await Vendor.create({
            name,
            contactDetails,
            address,
            vendorCode : Date.now(),
            onTimeDeliveryRate : 0,
            qualityRatingAvg : 0,
            averageResponseTime : 0,
            fulfillmentRate : 0
        })
        res.status(200).json({
            success : true,
            vendor
        })

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({
            success : false,
            message : "Error while creating vendor",
            error : error.message
        })
    }
}

const getVendor = async (req, res) => {
    try {
        const getAllVendor = await Vendor.find();
        res.status(200).json({
            success : true,
            getAllVendor
        })
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            success : false,
            message : "error while get all vendor",

        })
    }
}

const getSpecificVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const getSpecificVendor = await Vendor.findById(id);
        res.status(200).json({
            success : true,
            Vendor : getSpecificVendor
        })
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            success : false,
            message : "error while get specific vendor",

        })
    }
}

const updateVendorDetails = async (req, res) => {
    try {
        const Data = req.body;
        const id = req.params.id;
        const vendor = await Vendor.findByIdAndUpdate(id, Data, { new: true });
        res.status(200).json({
            success : true,
            vendor
        })
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            success : false,
            message : "Error while updating vendor details",
            error : error.message
        })
        
    }
}

const deleteVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const vendor = await Vendor.findByIdAndDelete(id);
        res.status(200).json({
            success : true,
            message : "Vendor deleted successfully",
            vendor
        })
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            success : false,
            message : "Error while deleting vendor",
            error : error.message
        })
    }
}

module.exports = {
    createVendor,
    getVendor,
    getSpecificVendor,
    updateVendorDetails,
    deleteVendor
}