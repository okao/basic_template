// const dbConfig = require("./database.config.js");
const dbConfig_all = require("./sequelize_config.js");
const Sequelize = require("sequelize");

//based on node environment, get the correct config file
const env = process.env.NODE_ENV || "development";
const dbConfig = dbConfig_all[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    operatorsAliases: "0",
    pool: dbConfig.pool,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.books_reviews = require("../models/book.model.js")(sequelize, Sequelize);
db.books_reviews = require("../database/models/book_reviews.model.js")(
  sequelize,
  Sequelize
);

module.exports = db;
