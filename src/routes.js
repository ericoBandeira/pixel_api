const express = require("express");
const UserController = require("./controller/UserController");
const HeartbeatController = require("./controller/HeartbeatController");
const PixelController = require("./controller/PixelController");
const FeatureController = require("./controller/FeatureController");
const jwt = require("./jwt");

const routes = express.Router();

routes.get("/health", jwt.verifyJWT, HeartbeatController.sendHealth);
routes.post("/login", UserController.loginUser);
routes.post("/register", UserController.createUser);
routes.post("/pixel/new", PixelController.createPixel);
routes.get("/pixel/:name", PixelController.getPixelByName);
routes.get("/pixel/by-mail/:mail", UserController.findPixelByUser);
routes.post("/pixel/:id/feed", PixelController.feedPixel);
routes.get("/features", FeatureController.getFeatures);
routes.post("/pixel/:id/feature/:feat_id/enable", PixelController.enablePixelFeature);

module.exports = routes;
