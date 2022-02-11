const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const env = require("dotenv");
const Feature = require("./model/Feature");
const Pixel = require("./model/Pixel");
const Team = require("./model/Team");
const User = require("./model/User");
const { Sequelize } = require("sequelize");

env.config();

const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

// Inicia o banco de dados
const connectionString = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:5432/${DB_NAME}`;

const db = new Sequelize(connectionString);
db.authenticate().then(() => {
  Feature.init(db);
  Pixel.init(db);
  Team.init(db);
  User.init(db);

  Feature.associate(db.models);
  Pixel.associate(db.models);
  Team.associate(db.models);
  User.associate(db.models);
});

// Inicia o servidor HTTP
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(9000);
