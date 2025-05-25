import express from "express";
import { getBookingSeats } from "../controllers/BookingSeatController.js";

const router = express.Router();

// Endpoint untuk get all booking_seats
router.get("/booking_seats", getBookingSeats);

export default router;
