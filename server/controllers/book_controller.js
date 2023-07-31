const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });
const bodyParser = require("body-parser");

const db = mysql.createPool({
  host: "mysql_db", // the host name MYSQL_DATABASE: node_mysql
  user: process.env.MYSQL_USER, // database user MYSQL_USER: MYSQL_USER
  password: process.env.MYSQL_PASSWORD, // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: process.env.MYSQL_DATABASE, // database name MYSQL_HOST_IP: mysql_db
});

// Methods to be executed on routes
const book_save = async (req, res) => {
  const bookName = req.body.bookName;
  const bookReview = req.body.bookReview;

  const InsertQuery =
    "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";

  try {
    const result = await db
      .promise()
      .query(InsertQuery, [bookName, bookReview]);

    return res.send("Values Inserted");
  } catch (err) {
    console.log(err);
  }
};

const get_books = async (req, res) => {
  const SelectQuery = "SELECT * FROM books_reviews";

  try {
    const result = await db.promise().query(SelectQuery);
    return res.send(result[0]);
  } catch (err) {
    console.log(err);
  }
};

// update a book review
const update_book = async (req, res) => {
  const bookId = req.params.bookId;
  const bookReview = req.body.bookReview;

  const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";

  try {
    const result = await db.promise().query(UpdateQuery, [bookReview, bookId]);
    return res.send("Values Updated");
  } catch (err) {
    console.log(err);
  }
};

//delete a book from the database
const delete_book = async (req, res) => {
  const bookId = req.params.bookId;
  const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
  try {
    const result = await db.promise().query(DeleteQuery, bookId);
    return res.send("Values Deleted");
  } catch (err) {
    console.log(err);
  }
};

// Export of all methods as object
module.exports = {
  book_save,
  get_books,
  update_book,
  delete_book,
};
