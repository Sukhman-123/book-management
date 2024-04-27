const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const authenticate = require("../middlewares/authenticate");

router.post("/create", authenticate, bookController.createBook);
router.get("/all-books", authenticate, bookController.getBooks);
router.get("/by-author", authenticate, bookController.getBooksByAuthor);
router.get("/by-year", authenticate, bookController.getBooksByYear);
router.put("/update", authenticate, bookController.updateBook);
router.delete("/delete", authenticate, bookController.deleteBook);

module.exports = router;
