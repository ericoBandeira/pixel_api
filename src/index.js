const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const env = require("dotenv");
const Feature = require("./model/Feature");
const Pixel = require("./model/Pixel");
const Team = require("./model/Team");
const User = require("./model/User");
const { Sequelize } = require("sequelize");
const morgan = require("morgan");

env.config();

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  SECURE_MODE,
  APP_PORT,
  PORT,
  DATABASE_URL,
} = process.env;

// Inicia o banco de dados
let connectionString = "";
if (DATABASE_URL != "") {
  connectionString = `${DATABASE_URL}`;
} else {
  connectionString = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

if (APP_PORT === undefined) {
  console.error("APP_PORT variable is undefined");
  process.exit(0);
}

console.info("connecting to postgres using " + connectionString);
console.info("DATABASE_URL=" + connectionString);
console.info(`secure mode: ${SECURE_MODE == 1 ? "enabled" : "disabled"}`);

const options =
  SECURE_MODE == 1
    ? {
        dialect: "postgres",
        define: {
          timestamps: true,
          underscored: true,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      }
    : {
        dialect: "postgres",
        define: {
          timestamps: true,
          underscored: true,
        },
        logging: false,
      };

const db = new Sequelize(connectionString, options);

db.authenticate().then(
  () => {
    Feature.init(db);
    Pixel.init(db);
    Team.init(db);
    User.init(db);

    Feature.associate(db.models);
    Pixel.associate(db.models);
    Team.associate(db.models);
    User.associate(db.models);

    // Inicia o servidor HTTP
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(morgan("short"));
    app.use(routes);

    if (PORT != undefined) {
      APP_PORT = PORT;
    }

    app.listen(APP_PORT);
    console.info(`HTTP server listening on port ${APP_PORT}`);
  },
  (rejected) => {
    console.error(`could not start HTTP server: ${rejected}`);
  }
);
