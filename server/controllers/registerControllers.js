import Author from "../models/author.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAuthor = async (req, res) => {
    const newAuthor = req.body;
    try {
        const isAuthorExists = await Author.findOne({ email: newAuthor.email });
        if (isAuthorExists) {
            return res.status(400).json({ message: "Author already exists" });
        }

        const hashedPassword = await bcrypt.hash(newAuthor.password, parseInt(process.env.SALT_ROUNDS_BCRYPT));
        const author = new Author({
            name: newAuthor.name,
            username: newAuthor.username,
            email: newAuthor.email,
            password: hashedPassword,
            books: [],
            articles: []
        });
        const storedAuthor = await author.save();

        const token = jwt.sign(
            { id: storedAuthor._id, email: storedAuthor.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ author: storedAuthor, token });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};