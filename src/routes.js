const express = require("express");
const UserController = require("./controller/UserController");
const HeartbeatController = require("./controller/HeartbeatController");
const PixelController = require("./controller/PixelController");
const FeatureController = require("./controller/FeatureController");
const TeamController = require("./controller/TeamController");
const jwt = require("./jwt");

const routes = express.Router();

routes.get("/health", HeartbeatController.sendHealth);
routes.post("/login", UserController.loginUser);
routes.post("/register", UserController.createUser);
routes.post("/pixel/new", jwt.verifyJWT, PixelController.createPixel);
routes.get("/pixel/by-user", UserController.findPixelByUser);
routes.post("/pixel/:id/feed", PixelController.feedPixel);
routes.get("/features", FeatureController.getFeatures);
routes.get("/pixel/:pixel_id/features", PixelController.getPixelFeatures);
routes.post(
  "/pixel/:id/feature/:feat_id/enable",
  PixelController.enablePixelFeature
);
routes.post("/team/new", TeamController.createTeam);
routes.get("/team/:team_id/pixel", TeamController.getTeamPixel);
routes.post(
  "/team/:team_id/pixel/:pixel_id/associate",
  TeamController.setTeamPixel
);
routes.get("/teams", TeamController.getTeams);
routes.get("/pixel/:id/history", PixelController.getFeedingHistorybyID);

module.exports = routes;
