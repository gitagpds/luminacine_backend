import express from "express";
import {
  getSeats,
  createSeat,
  updateSeat,
  deleteSeat,
} from "../controllers/SeatController.js";

const router = express.Router();

// Endpoint untuk CRUD seats
router.get("/seats", getSeats);
router.post("/seats", createSeat);
router.put("/seats/:id", updateSeat);
router.delete("/seats/:id", deleteSeat);

export default router;
