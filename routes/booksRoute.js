import express from "express";
import { Book } from "../models/bookmodel.js";

const router = express.Router();

//Route for save anew book

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "All fields required",
      });
    }
    const newbook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      image: req.body.image,
    };
    const books = await Book.create(newbook);
    res.status(201).send({
      message: "Book created successfully",
      book: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for Get Book bt its id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for update abook
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all req fields",
      });
    }

    const { id } = req.params;
    const bookToBeUpdated = await Book.findByIdAndUpdate(id, req.body);
    if (!bookToBeUpdated) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for deleting book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookToBeDeleted = await Book.findByIdAndDelete(id);
    if (!bookToBeDeleted) {
      return res.status(200).send({ message: "Book deleted successfully" });
      resttus(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
export default router;
