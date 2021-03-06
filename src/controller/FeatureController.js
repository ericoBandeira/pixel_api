const Feature = require("../model/Feature");

async function getFeatures(req, res) {
  try {
    const features = await Feature.findAll({
      attributes: ["id", "name", "value", "active", "feeding_date"],
    });

    return res.status(200).json(features);
  } catch (err) {
    return res.status(500).json({ error: "could not get features" });
  }
}

module.exports = { getFeatures };
