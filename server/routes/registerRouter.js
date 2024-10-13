import express from 'express';
import { createAuthor } from '../controllers/registerControllers.js';

const registerRouter = express.Router()

registerRouter.post("/", createAuthor)


export default registerRouter