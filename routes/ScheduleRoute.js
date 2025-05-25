import express from "express";
import {
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/ScheduleController.js";

const router = express.Router();

// Endpoint untuk CRUD schedules
router.get("/schedules", getSchedules);
router.get("/schedules/:id", getScheduleById);
router.post("/schedules", createSchedule);
router.put("/schedules/:id", updateSchedule);
router.delete("/schedules/:id", deleteSchedule);

export default router;
