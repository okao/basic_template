const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });
const bodyParser = require("body-parser");
const database = require("../database/models");
const { QueryTypes } = require("sequelize");
// BookReview model
const BookReview = require("../database/models/bookreview.js");

console.log(BookReview);

// get current timestamp in mysql format
const get_current_timestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // months are zero indexed
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const mysql_timestamp = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return mysql_timestamp;
};

// Methods to be executed on routes
const book_save = async (req, res) => {
  const bookName = req.body.bookName;
  const bookReview = req.body.bookReview;
  const createdAt = get_current_timestamp();
  const updatedAt = get_current_timestamp();

  const InsertQuery =
    "INSERT INTO BookReviews (book_name, book_review, createdAt, updatedAt) VALUES (?, ?, ?, ?)";

  try {
    // const result = await db
    //   .promise()
    //   .query(InsertQuery, [bookName, bookReview]);

    const result = await database.sequelize.query(InsertQuery, {
      type: QueryTypes.INSERT,
      plain: false,
      raw: true,
      replacements: [bookName, bookReview, createdAt, updatedAt],
    });

    console.log(result);

    return res.send("Values Inserted");
  } catch (err) {
    console.log(err);
  }
};

const get_books = async (req, res) => {
  const SelectQuery = "SELECT * FROM BookReviews ORDER BY id DESC";

  try {
    // const result = await db.promise().query(SelectQuery);
    const db_data = await database.sequelize.query(SelectQuery, {
      type: QueryTypes.SELECT,
      plain: false,
      raw: true,
      model: BookReview,
      mapToModel: true,
    });

    console.log(db_data);

    return res.send(db_data);
  } catch (err) {
    console.log(err);
  }
};

// update a book review
const update_book = async (req, res) => {
  const bookId = req.params.bookId;
  const bookReview = req.body.bookReview;

  const UpdateQuery = "UPDATE BookReviews SET book_review = ? WHERE id = ?";

  try {
    // const result = await db.promise().query(UpdateQuery, [bookReview, bookId]);

    const result = await database_sequelize.sequelize.query(UpdateQuery, {
      type: QueryTypes.UPDATE,
      plain: false,
      raw: true,
      replacements: [bookReview, bookId],
    });

    console.log(result);

    return res.send("Values Updated");
  } catch (err) {
    console.log(err);
  }
};

//delete a book from the database
const delete_book = async (req, res) => {
  const bookId = req.params.bookId;
  const DeleteQuery = "DELETE FROM BookReviews WHERE id = ?";
  try {
    // const result = await db.promise().query(DeleteQuery, bookId);

    const result = await database_sequelize.sequelize.query(DeleteQuery, {
      type: QueryTypes.DELETE,
      plain: false,
      raw: true,
      replacements: [bookId],
    });

    console.log(result);

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
