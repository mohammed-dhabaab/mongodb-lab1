import express from "express";
import { createAuthor, getAllAuthors, getAuthorById } from "../controllers/authorsController.js";


const router = express.Router();

router.get("/", getAllAuthors)
router.get("/:id", getAuthorById)
router.post("/", createAuthor)

export default router