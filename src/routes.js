const express = require("express");
const UserController = require("./controller/UserController");
const HeartbeatController = require("./controller/HeartbeatController");
const jwt = require("./jwt");

const routes = express.Router();

routes.get("/health", HeartbeatController.sendHealth);
routes.post("/login", jwt.verifyJWT, UserController.loginUser);
routes.post("/register", UserController.createUser);

module.exports = routes;
