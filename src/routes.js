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
routes.get("/pixel/by-mail", UserController.findPixelByUser);
routes.post("/pixel/:id/feed", PixelController.feedPixel);
routes.get("/features", FeatureController.getFeatures);
routes.post("/pixel/:id/feature/:feat_id/enable", PixelController.enablePixelFeature);
routes.post("/team/new", TeamController.createTeam);

module.exports = routes;
