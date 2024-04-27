const { v4: uuidv4 } = require("uuid");
const bookSchema = require("../models/book");

const createBook = async (req, res) => {
  try {
    const { title, author, publication_year } = req.body;

    if (!req.user || !req.user.user_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid user information" });
    }

    const existingBook = await bookSchema.findOne({ title, author });

    if (existingBook) {
      return res
        .status(409)
        .json({ success: false, message: "Book already exists" });
    }
    const book_id = uuidv4();
    const newBook = new bookSchema({
      book_id,
      title,
      author,
      publication_year,
    });

    await newBook.save();
    return res.status(201).json({ success: true, newBook });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid user information" });
    }
    const allBooks = await bookSchema.find({}, { __v: 0, _id: 0 });

    if (allBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found",
      });
    }
    res.status(200).json({ sucees: true, allBooks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getBooksByAuthor = async (req, res) => {
  const { author } = req.query;
  try {
    if (!req.user || !req.user.user_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid user information" });
    }
    const booksByAuthor = await bookSchema.find({ author }, { __v: 0, _id: 0 });

    if (booksByAuthor.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found for the specified author",
      });
    }
    res.status(200).json({ success: true, booksByAuthor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getBooksByYear = async (req, res) => {
  const year = parseInt(req.query.year, 10);
  try {
    if (!req.user || !req.user.user_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid user information" });
    }

    if (isNaN(year)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing 'year' query parameter",
      });
    }

    const booksByYear = await bookSchema.find(
      { publication_year: year },
      { __v: 0, _id: 0 }
    );

    if (booksByYear.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found for the specified year",
      });
    }

    res.status(200).json({ success: true, booksByYear });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid user information" });
    }

    const { id } = req.query;
    const { title, author, publication_year } = req.body;

    const book = await bookSchema.findOne({ book_id: id });

    if (!book) {
      return res.status(404).json({
        message: "Book not found or you don't have permission to update it",
      });
    }

    if (
      title === book.title &&
      author === book.author &&
      publication_year === book.publication_year
    ) {
      return res.status(409).json({
        success: false,
        message: "No changes detected; book values are the same as before",
      });
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (publication_year) book.publication_year = publication_year;

    await book.save();

    return res.status(200).json({ success: true, book });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid user information" });
    }

    const { id } = req.query;

    const deleteBook = await bookSchema.findOneAndDelete({
      book_id: id,
    });

    if (!deleteBook) {
      return res.status(404).json({
        message: "Book not found or you don't have permission to delete it",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const bookController = {
  createBook,
  getBooks,
  getBooksByAuthor,
  getBooksByYear,
  updateBook,
  deleteBook,
};

module.exports = bookController;
