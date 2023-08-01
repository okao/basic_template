const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });
const bodyParser = require("body-parser");
const database = require("../database/models");
const { QueryTypes } = require("sequelize");

// Methods to be executed on routes
const book_save = async (req, res) => {
  const bookName = req.body.bookName;
  const bookReview = req.body.bookReview;

  const InsertQuery =
    "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";

  try {
    // const result = await db
    //   .promise()
    //   .query(InsertQuery, [bookName, bookReview]);

    const result = await database.sequelize.query(InsertQuery, {
      type: QueryTypes.INSERT,
      plain: false,
      raw: true,
      replacements: [bookName, bookReview],
    });

    console.log(result);

    return res.send("Values Inserted");
  } catch (err) {
    console.log(err);
  }
};

const get_books = async (req, res) => {
  const SelectQuery = "SELECT * FROM books_reviews ORDER BY id DESC";

  try {
    // const result = await db.promise().query(SelectQuery);
    const db_data = await database.sequelize.query(SelectQuery, {
      // type: QueryTypes.SELECT,
      plain: false,
      raw: true,
      model: database.books_reviews,
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

  const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";

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
  const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
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
