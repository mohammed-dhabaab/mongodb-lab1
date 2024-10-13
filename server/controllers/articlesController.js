import Article from '../models/article.js';
import Author from '../models/author.js';

export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        if (!articles) {
            return res.status(404).json({ message: "Articles not found" })
        }
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).send({ message: "Article not found" });
        }
        res.status(200).send(article);
    } catch (error) {
        res.status(400).send(error);
    }
};

// export const createArticle = async (req, res) => {
//     const newArticle = req.body;
//     const article = new Article({
//         title: newArticle.title,
//         content: newArticle.content,
//         author: newArticle.author,
//         freelancer: newArticle.freelancer || false
//     });

//     try {
//         const storedArticle = await article.save();
//         res.status(201).send(storedArticle);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// };
export const createArticle = async (req, res) => {
    const { title, content, author: authorId, freelancer } = req.body;

    if (!title || !content || !authorId) {
        return res.status(400).json({ message: "Title, content, and author ID are required" });
    }

    try {
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        const article = new Article({
            title,
            content,
            author: author._id,
            freelancer
        });

        const savedArticle = await article.save();

        author.articles.push(savedArticle._id);
        await author.save();

        return res.status(201).json({ message: 'Article created successfully', article: savedArticle });
    } catch (error) {
        console.error('Error creating article:', error);
        return res.status(500).json({ message: 'Error creating article', error: error.message });
    }
};

export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const newUpdates = req.body;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(id, newUpdates, { new: true, runValidators: true });
        if (!updatedArticle) {
            return res.status(404).send({ message: "Article not found" });
        }
        res.status(200).send(updatedArticle);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).send({ message: "Article not found" });
        }
        res.send({ message: 'Article deleted successfully', article: deletedArticle });
    } catch (error) {
        res.status(500).send(error);
    }
};