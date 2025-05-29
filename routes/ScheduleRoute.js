import express from "express";
import {
  getSchedules,
  getScheduleById,
  getSchedulesByMovieId,
  createSchedule,
  createScheduleForMovie,
  updateSchedule,
  updateScheduleForMovie,
  deleteSchedule,
  getScheduleForMovieById,
} from "../controllers/ScheduleController.js";

const router = express.Router();

// Endpoint untuk CRUD schedules
router.get("/schedules", getSchedules);
router.get("/schedules/:id", getScheduleById);
router.get("/movies/:movieId/schedules", getSchedulesByMovieId);
router.get("/movies/:movieId/schedules/:id", getScheduleForMovieById);
router.post("/schedules", createSchedule);
router.post("/movies/:movieId/schedules", createScheduleForMovie);
router.put("/schedules/:id", updateSchedule);
router.put("/movies/:movieId/schedules/:id", updateScheduleForMovie);
router.delete("/schedules/:id", deleteSchedule);

export default router;
