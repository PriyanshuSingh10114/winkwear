const axios = require("axios");

const getPincodeDetails = async (pincode) => {
  try {
    const res = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    const postOffice = res.data?.[0]?.PostOffice?.[0];
    if (!postOffice) return null;

    return {
      city: postOffice.District,
      state: postOffice.State,
      country: postOffice.Country || "India",
    };
  } catch (error) {
    return null;
  }
};

module.exports = { getPincodeDetails };
