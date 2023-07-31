const express = require("express");

const cors = require("cors");
const app = express();
require("dotenv").config({ path: ".env" });
const bodyParser = require("body-parser");
const myRoutes = require("./routes");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(express.json());
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", myRoutes);

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
