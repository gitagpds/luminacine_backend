import express from "express";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingDetailById,
  getBookingsByUserId,
} from "../controllers/BookingController.js";

const router = express.Router();

// Endpoint utama
router.get("/bookings", getBookings);
router.get("/bookings/:id", getBookingById);
router.post("/bookings", createBooking);
router.put("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);

// ✅ Tambahan endpoint baru
router.get("/booking-detail/:id", getBookingDetailById); // detail lengkap 1 booking
router.get("/bookings/user/:id_user", getBookingsByUserId); // semua booking milik user

export default router;
