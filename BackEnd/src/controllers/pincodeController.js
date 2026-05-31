const pincodeService = require("../services/pincodeService");

const getPincode = async (req, res, next) => {
  try {
    const { pincode } = req.params;

    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pincode",
      });
    }

    const data = await pincodeService.getPincodeDetails(pincode);

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
    next(error);
  }
};

module.exports = { getPincode };
