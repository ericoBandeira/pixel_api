const Pixel = require("../model/Pixel");
const Feature = require("../model/Feature");

async function createPixel(req, res) {
  const { name, eye } = req.body;

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

async function createFeature(name, value) {
  return await Feature.create({
    name,
    value,
    active: true,
    feeding_date: new Date(),
  });
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

  const visibility_feat = await Feature.findOne({ where: { name: "visibility" } });
  const match_feat = await Feature.findOne({ where: { name: "match" } });
  const control_feat = await Feature.findOne({ where: { name: "control" } });
  const consistence_feat = await Feature.findOne({ where: { name: "consistence" } });
  const recognition_feat = await Feature.findOne({ where: { name: "recognition" } });
  const efficiency_feat = await Feature.findOne({ where: { name: "efficiency" } });
  const minimalism_feat = await Feature.findOne({ where: { name: "minimalism" } });
  const error_prevention_feat = await Feature.findOne({
    where: { name: "error_prevention" },
  });

  visibility_feat.value = visibility;
  match_feat.value = match;
  control_feat.value = control;
  consistence_feat.value = consistence;
  recognition_feat.value = recognition;
  efficiency_feat.value = efficiency;
  minimalism_feat.value = minimalism;
  error_prevention.value = error_prevention;

  visibility_feat.setPixel(pixel);

  return res.status(200).json(response);
}

module.exports = {
  createPixel,
  getPixelByName,
  feedPixel,
};
