const Pixel = require("../model/Pixel");
const Feature = require("../model/Feature");

async function createPixel(req, res) {
  const { name, eye } = req.body;

  if (!name || !eye) {
    return res.status(400).json({ error: "missing required fields in body" });
  }

  const newPixel = await Pixel.create({ name, eye });

  return res.status(200).json(newPixel);
}

async function getPixelByName(req, res) {
  const { name } = req.params;

  const pixel = await Pixel.findOne({ where: { name } });
  if (!pixel) {
    return res.status(404).json({ error: `pixel not found: ${name}` });
  }

  return res.status(200).json(pixel);
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

  visibility_feat.value = visibility;
  visibility_feat.feeding_date = new Date();
  match_feat.value = match;
  match_feat.feeding_date = new Date();
  control_feat.value = control;
  control_feat.feeding_date = new Date();
  consistence_feat.value = consistence;
  consistence_feat.feeding_date = new Date();
  recognition_feat.value = recognition;
  recognition_feat.feeding_date = new Date();
  efficiency_feat.value = efficiency;
  efficiency_feat.feeding_date = new Date();
  minimalism_feat.value = minimalism;
  minimalism_feat.feeding_date = new Date();
  error_prevention_feat.value = error_prevention;
  error_prevention_feat.feeding_date = new Date();

  pixel.setFeatures([
    visibility_feat,
    match_feat,
    control_feat,
    consistence_feat,
    recognition_feat,
    efficiency_feat,
    minimalism_feat,
    error_prevention_feat,
  ]);

  return res.status(200).json(response);
}

async function enablePixelFeature(req, res) {
  const { id, feat_id } = req.params;
  const { enabled } = req.body;

  const pixel = await Pixel.findByPk(id);
  const feature = await Feature.findByPk(feat_id);
  if (!pixel || !feature) {
    return res.status(404).json({ error: "pixel or feature not found" });
  }

  feature.active = !!enabled;

  pixel.addFeature(feature);

  // Get features of pixel
  const features = await Pixel.getFeatures();

  return res.status(200).json(features);
}

module.exports = {
  createPixel,
  getPixelByName,
  feedPixel,
  enablePixelFeature,
};
