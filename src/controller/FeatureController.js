const Feature = require("../model/Feature");

async function getFeatures(req, res) {
  const features = await Feature.findAll();

  return res.status(200).json(features);
}

module.exports = { getFeatures };
