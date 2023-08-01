require("dotenv").config({ path: "../.env" });

module.exports = {
  //   HOST: "mysql_db",
  HOST: process.env.MYSQL_HOST,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DATABASE,
  PORT: process.env.MYSQL_PORT,
  dialect: "mysql",
  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
