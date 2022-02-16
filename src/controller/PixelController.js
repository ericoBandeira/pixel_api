const Pixel = require("../model/Pixel");
const Feature = require("../model/Feature");
const User = require("../model/User");

async function addAllFeatures(pixel) {
  const visibility_feat = await Feature.findOne({
    where: { name: "visibility" },
  });
  const match_feat = await Feature.findOne({ where: { name: "match" } });
  const control_feat = await Feature.findOne({ where: { name: "control" } });
  const consistence_feat = await Feature.findOne({
    where: { name: "consistence" },
  });
  const recognition_feat = await Feature.findOne({
    where: { name: "recognition" },
  });
  const efficiency_feat = await Feature.findOne({
    where: { name: "efficiency" },
  });
  const minimalism_feat = await Feature.findOne({
    where: { name: "minimalism" },
  });
  const error_prevention_feat = await Feature.findOne({
    where: { name: "error_prevention" },
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
  const { name, eye } = req.body;

  const userId = req.decoded.user_id;

  if (!name || !eye) {
    return res.status(400).json({ error: "missing required fields in body" });
  }

  const newPixel = await Pixel.create({ name, eye });
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

    await feat.save();
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

module.exports = {
  createPixel,
  feedPixel,
  enablePixelFeature,
};
