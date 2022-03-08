const Pixel = require("../model/Pixel");
const Feature = require("../model/Feature");
const User = require("../model/User");
const { FeedingHistory } = require("../model/FeedingHistory");

async function addAllFeatures(pixel) {
  const visibility_feat = await Feature.create({
    name: "visibility",
    value: 0,
    active: true,
    feeding_date: new Date(),
  });

  const match_feat = await Feature.create({
    name: "match",
    value: 0,
    active: true,
    feeding_date: new Date(),
  });

  const control_feat = await Feature.create({
    name: "control",
    value: 0,
    active: true,
    feeding_date: new Date(),
  });

  const consistence_feat = await Feature.create({
    name: "consistence",
    value: 0,
    active: true,
    feeding_date: new Date(),
  });

  const recognition_feat = await Feature.create({
    name: "recognition",
    value: 0,
    active: true,
    feeding_date: new Date(),
  });

  const efficiency_feat = await Feature.create({
    name: "efficiency",
    value: 0,
    active: true,
    feeding_date: new Date(),
  });
  const minimalism_feat = await Feature.create({
    name: "minimalism",
    value: 0,
    active: true,
    feeding_date: new Date(),
  });

  const error_prevention_feat = await Feature.create({
    name: "error_prevention",
    value: 0,
    active: true,
    feeding_date: new Date(),
  });

  await pixel.addFeature(visibility_feat);
  await pixel.addFeature(match_feat);
  await pixel.addFeature(control_feat);
  await pixel.addFeature(consistence_feat);
  await pixel.addFeature(recognition_feat);
  await pixel.addFeature(efficiency_feat);
  await pixel.addFeature(minimalism_feat);
  await pixel.addFeature(error_prevention_feat);
}

async function createPixel(req, res) {
  const { name, eye, color } = req.body;

  const userId = req.decoded.user_id;

  if (!name || !eye || !color) {
    return res.status(400).json({ error: "missing required fields in body" });
  }

  const newPixel = await Pixel.create({ name, eye, color });
  if (!newPixel) {
    return res.status(500).json({ error: "could not create pixel" });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  const userPixel = await user.setPixel(newPixel);

  // Add features to the created pixel
  await addAllFeatures(userPixel);

  return res.status(200).json(userPixel);
}

async function feedPixel(req, res) {
  const { id } = req.params;
  const {
    visibility,
    match,
    control,
    consistence,
    recognition,
    efficiency,
    minimalism,
    error_prevention,
  } = req.body;

  const pixel = await Pixel.findByPk(id);
  if (!pixel) {
    return res.status(404).json({ error: "pixel not found" });
  }

  const features = await pixel.getFeatures();

  features.forEach(async (feat) => {
    if (feat.name === "visibility") {
      feat.value = visibility ? visibility : feat.value;
    } else if (feat.name === "match") {
      feat.value = match ? match : feat.value;
    } else if (feat.name === "control") {
      feat.value = control ? control : feat.value;
    } else if (feat.name === "consistence") {
      feat.value = consistence ? consistence : feat.value;
    } else if (feat.name === "recognition") {
      feat.value = recognition ? recognition : feat.value;
    } else if (feat.name === "efficiency") {
      feat.value = efficiency ? efficiency : feat.value;
    } else if (feat.name === "minimalism") {
      feat.value = minimalism ? minimalism : feat.value;
    } else if (feat.name === "error_prevention") {
      feat.value = error_prevention ? error_prevention : feat.value;
    }

    // updates feeding date of this feature
    feat.feeding_date = new Date();

    await feat.save();

    // Creates an entry into history
    try {
      await pixel.addFeedingHistory({
        feature_name: feat.name,
        fed_at: feat.feeding_date,
        active: feat.active,
      });
    } catch (err) {
      console.error(`could not updated history: ${err}`);
      return res.status(500).json({ error: "could not insert history entry" });
    }
  });

  return res.status(200).json(features);
}

async function enablePixelFeature(req, res) {
  const { id, feat_id } = req.params;
  const { enabled } = req.body;

  const featId = Number.parseInt(feat_id);

  const pixel = await Pixel.findByPk(id);
  const features = await pixel.getFeatures();
  if (!pixel || !features) {
    return res.status(404).json({ error: "pixel or feature not found" });
  }

  features.forEach(async (feature) => {
    if (feature.id === featId) {
      feature.active = !!enabled;
      await feature.save();
    }
  });

  return res.status(200).json(features);
}

async function getPixelFeatures(req, res) {
  const { pixel_id } = req.params;

  const pixel = await Pixel.findByPk(pixel_id);
  if (!pixel) {
    return res.status(404).json({ error: "pixel not found" });
  }

  const features = await pixel.getFeatures();

  return res.status(200).json(features);
}

async function getFeedingHistorybyID(req, res) {
  const { id } = req.params;

  const pixel = await Pixel.findByPk(id);
  if (!pixel) {
    return res.status(404).json({ error: "pixel not found" });
  }

  const history = await pixel.getFeedingHistories();
  if (!history) {
    return res.status(204);
  }

  return res.status(200).json(history);
}

module.exports = {
  createPixel,
  feedPixel,
  enablePixelFeature,
  getPixelFeatures,
  getFeedingHistorybyID,
};
