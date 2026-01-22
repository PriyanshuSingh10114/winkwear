const express = require("express");
const router = express.Router();
const { getPincodeDetails } = require("./pincodeService");

router.get("/:pincode", async (req, res) => {
  try {
    const { pincode } = req.params;

    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pincode",
      });
    }

    const data = await getPincodeDetails(pincode);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Pincode not found",
      });
    }

    res.json({
      success: true,
      city: data.city,
      state: data.state,
      country: data.country,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
