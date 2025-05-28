import express from "express";
import upload from "../middleware/upload.js";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  updateMoviePoster, // import fungsi baru
} from "../controllers/MovieController.js";

const router = express.Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.post("/movies", createMovie);
router.post("/movies", upload.single("poster"), createMovie); // buat upload poster ke bucket storage
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;
