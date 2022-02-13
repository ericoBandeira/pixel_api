const express = require("express");
const UserController = require("./controller/UserController");
const HeartbeatController = require("./controller/HeartbeatController");
const PixelController = require("./controller/PixelController");
const jwt = require("./jwt");

const routes = express.Router();

routes.get("/health", HeartbeatController.sendHealth);
routes.post("/login", jwt.verifyJWT, UserController.loginUser);
routes.post("/register", UserController.createUser);
routes.post("/pixel/new", PixelController.createPixel);
routes.get("/pixel/:name", PixelController.getPixelByName);
routes.post("/pixel/:id/feed", PixelController.feedPixel);

module.exports = routes;
