import express from 'express';
import {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
} from '../controllers/articlesController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', authenticateToken, createArticle);
router.patch('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;