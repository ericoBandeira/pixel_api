const Team = require("../model/Team");

async function createTeam(req, res) {
  const team = await Team.create();

  return res.status(200).json(team);
}

module.exports = { createTeam };
