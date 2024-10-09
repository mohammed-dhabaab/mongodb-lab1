import Author from "../models/author.js";

export const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find()
        if (!authors) {
            return res.status(404).json({ message: "Authors not found" })
        }
        res.status(200).send(authors)
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

export const getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).send({ message: "Author not found" });
        }
        res.status(200).send(author);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const createAuthor = async (req, res) => {
    const newAuthor = req.body;
    const author = new Author({
        name: newAuthor.name,
        username: newAuthor.username,
        email: newAuthor.email,
    });

    try {
        const storedAuthor = await author.save();
        res.status(201).send(storedAuthor);
    } catch (err) {
        res.status(400).send(err);
    }
};