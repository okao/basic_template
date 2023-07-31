require("dotenv").config({ path: "../.env" });
const mysql = require("mysql2");

const db_connection = mysql.createConnection({
  host: "mysql_db", // the host name MYSQL_DATABASE: node_mysql
  user: process.env.MYSQL_USER, // database user MYSQL_USER: MYSQL_USER
  password: process.env.MYSQL_PASSWORD, // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: process.env.MYSQL_DATABASE, // database name MYSQL_HOST_IP: mysql_db
  port: process.env.MYSQL_PORT, // database port MYSQL_PORT: 3306
});

db_connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(
      `Connected to database ${process.env.MYSQL_DATABASE} on port ${process.env.MYSQL_PORT} as user ${process.env.MYSQL_USER}`
    );
  }
});

// if failed to connect to database
db_connection.on("error", (err) => {
  console.log(err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    db_connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          `Connected to database ${process.env.MYSQL_DATABASE} on port ${process.env.MYSQL_PORT} as user ${process.env.MYSQL_USER}`
        );
      }
    });
  } else {
    throw err;
  }
});

module.exports = db_connection;
