const requireJsonContent = require("../middlewares/RequireJson");

// 3rd Party Modules
const { Router } = require("express");

// Local Modules
const book_controller = require("../controllers/book_controller");

// Initialization
const router = Router();

// book routes
router.get("/book_reviews", book_controller.get_books);
router.post("/book_review", [requireJsonContent], book_controller.book_save);
router.put("/book_review/:bookId", book_controller.update_book);
router.delete("/book_review/:bookId", book_controller.delete_book);

module.exports = router;
