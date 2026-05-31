const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getPincodeDetails = async (pincode) => {
  try {
    const res = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`,
      {
        httpsAgent: agent,
      }
    );

    const postOffice = res.data?.[0]?.PostOffice?.[0];

    if (!postOffice) return null;

    return {
      city: postOffice.District,
      state: postOffice.State,
      country: postOffice.Country,
    };
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

module.exports = { getPincodeDetails };