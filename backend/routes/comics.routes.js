import { createComic, getAllComics, updateComicBook, deleteComic } from "../controllers/comicBook.controller.js";
import express from "express";

const router = express.Router();

router.post("/",createComic)

router.get("/",getAllComics)

router.put("/:id", updateComicBook)

router.delete("/:id",deleteComic)

export default router;
