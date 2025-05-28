import express from "express";
import {
  getSeats,
  getSeatsByScheduleId,
  createSeat,
  updateSeat,
  deleteSeat,
} from "../controllers/SeatController.js";

const router = express.Router();

// Endpoint utama
router.get("/seats", getSeats); // bisa pakai query: /seats?scheduleId=123

// Endpoint baru khusus berdasarkan ID schedule
router.get("/seats/schedule/:scheduleId", getSeatsByScheduleId);

router.post("/seats", createSeat);
router.put("/seats/:id", updateSeat);
router.delete("/seats/:id", deleteSeat);

export default router;
