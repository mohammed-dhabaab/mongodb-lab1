import Book from '../models/book.js';

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (!books) {
            return res.status(404).json({ message: "Books not found" })
        }
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({ message: "Books not found" });
        }
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const createBook = async (req, res) => {
    const newBook = req.body;
    const book = new Book({
        title: newBook.title,
        title: newBook.title,
        content: newBook.content,
        author: newBook.author,
        editionNumber: newBook.editionNumber,
        publicationAt: newBook.publicationAt,
        eVersion: newBook.eVersion,
        price: newBook.price,
        languages: newBook.languages,
        classification: newBook.classification
    });

    try {
        const storedBook = await book.save();
        res.status(201).send(storedBook);
    } catch (err) {
        res.status(400).send(err);
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const newUpdates = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, newUpdates, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.status(200).send(updatedBook);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.send({ message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
        res.status(500).send(error);
    }
};