// 3rd Party Modules
const { Router } = require("express");

// Local Modules
const book_controller = require("../controllers/book_controller");

// Initialization
const router = Router();

const requireJsonContent = (request, response, next) => {
  if (request.headers["content-type"] !== "application/json") {
    response.status(400).send("Server requires application/json");
  } else {
    console.log("Content-Type OK");
    next();
  }
};

//check the time of the request
const checkTime = (request, response, next) => {
  console.log("Time:", Date.now());
  next();
};

// Requests
router.get("/book_reviews", book_controller.get_books);
router.post(
  "/book_review",
  [requireJsonContent, checkTime],
  book_controller.book_save
);
router.put("/book_review/:bookId", book_controller.update_book);
router.delete("/book_review/:bookId", book_controller.delete_book);

module.exports = router;
