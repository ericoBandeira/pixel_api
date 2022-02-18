const Pixel = require("../model/Pixel");
const Team = require("../model/Team");

async function createTeam(req, res) {
  const team = await Team.create();

  return res.status(200).json(team);
}

async function getTeamPixel(req, res) {
  const { team_id } = req.params;

  const team = await Team.findByPk(team_id);
  if (!team) {
    return res.status(404).json({ error: "team not found" });
  }

  const pixel = await team.getPixel();
  if (!pixel) {
    return res.status(204);
  }

  return res.status(200).json(pixel);
}

async function setTeamPixel(req, res) {
  const { pixel_id, team_id } = req.params;

  const pixel = await Pixel.findByPk(pixel_id);
  const team = await Team.findByPk(team_id);
  if (!pixel || !team) {
    return res.status(404).json({ error: "pixel or team not found" });
  }

  const currentPixel = await team.getPixel();
  if (currentPixel) {
    return res.status(400).json({ error: "this team already has a pixel" });
  }

  const teamPixel = await team.setPixel(pixel);
  await team.save();

  return res.status(200).json(teamPixel);
}

async function getTeams(req, res) {
  const teams = await Team.findAll();
  return res.status(200).json(teams);
}
module.exports = { createTeam, getTeamPixel, setTeamPixel, getTeams };
