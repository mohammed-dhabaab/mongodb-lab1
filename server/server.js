import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import articleRouter from './routes/articles.js'
import booksRouter from './routes/books.js'
import authorRouter from './routes/authors.js'
import registerRouter from './routes/registerRouter.js'
import loginRouter from './routes/loginRouter.js';
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());


connectDB()

app.use("/register", registerRouter)
app.use("/login", loginRouter)
app.use('/articles', articleRouter)
app.use('/books', booksRouter)
app.use('/authors', authorRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});