const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: ".env" });

const db = mysql.createPool({
  host: "mysql_db", // the host name MYSQL_DATABASE: node_mysql
  user: process.env.MYSQL_USER, // database user MYSQL_USER: MYSQL_USER
  password: process.env.MYSQL_PASSWORD, // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: process.env.MYSQL_DATABASE, // database name MYSQL_HOST_IP: mysql_db
});

console.log(process.env.MYSQL_USER);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.get("/get", (req, res) => {
  const SelectQuery = "SELECT * FROM books_reviews";
  db.query(SelectQuery, (err, result) => {
    res.send(result);
  });
});

// add a book to the database
app.post("/insert", (req, res) => {
  const bookName = req.body.bookName;
  const bookReview = req.body.bookReview;

  console.log(bookName);
  console.log(bookReview);

  const InsertQuery =
    "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
  db.query(InsertQuery, [bookName, bookReview], (err, result) => {
    console.log(result);

    if (err) console.log(err);

    res.send("Values Inserted");
  });
});

// delete a book from the database
app.delete("/delete/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
  db.query(DeleteQuery, bookId, (err, result) => {
    if (err) console.log(err);

    res.send("Values Deleted");
  });
});

// update a book review
app.put("/update/:bookId", (req, res) => {
  const bookReview = req.body.reviewUpdate;
  const bookId = req.params.bookId;
  const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
  db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
    if (err) console.log(err);

    res.send("Values Updated");
  });
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
