import Author from "../models/author.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const author = await Author.findOne({ email });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const isMatch = await bcrypt.compare(password, author.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }


        const token = jwt.sign(
            { id: author._id, email: author.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', author: { id: author._id, email: author.email }, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};