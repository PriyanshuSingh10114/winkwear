const express = require("express");
const router = express.Router();
const pincodeController = require("../controllers/pincodeController");

router.get("/:pincode", pincodeController.getPincode);

module.exports = router;
