import Booking from "../models/BookingModel.js";
import Seat from "../models/SeatModel.js";

// GET ALL BOOKINGS
async function getBookings(req, res) {
  try {
    const bookings = await Booking.findAll();
    return res.status(200).json({
      status: "Success",
      message: "Bookings Retrieved",
      data: bookings,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET BOOKING BY ID
async function getBookingById(req, res) {
  try {
    const booking = await Booking.findOne({
      where: { id_booking: req.params.id },
      include: [
        { model: Seat },        // Include seats yang dipesan
        { model: Schedule },    // Optional: include schedule info
      ],
    });

    if (!booking) {
      const error = new Error("Booking tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Booking Retrieved",
      data: booking,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE BOOKING
async function createBooking(req, res) {
  try {
    const { id_user, id_schedule, seats, total_price } = req.body;

    if (!id_user || !id_schedule || !seats || seats.length === 0 || !total_price) {
      const error = new Error("Field cannot be empty and seats cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    // Buat booking
    const newBooking = await Booking.create({ id_user, id_schedule, total_price });

    // Tambahkan relasi booking_seats
    // seats diharapkan array berisi id_seat, contoh: [1, 2, 3]
    await newBooking.setSeats(seats);

    // Ambil ulang booking dengan seat untuk response
    const bookingWithSeats = await Booking.findOne({
      where: { id_booking: newBooking.id_booking },
      include: [Seat],
    });

    return res.status(201).json({
      status: "Success",
      message: "Booking Created",
      data: bookingWithSeats,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// UPDATE BOOKING
async function updateBooking(req, res) {
  try {
    const { id_user, id_schedule, seats, total_price } = req.body;

    if (!id_user || !id_schedule || !seats || !total_price) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    const bookingExist = await Booking.findOne({
      where: { id_booking: req.params.id },
    });

    if (!bookingExist) {
      const error = new Error("Booking tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await Booking.update(req.body, {
      where: { id_booking: req.params.id },
    });

    if (result[0] === 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Booking Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE BOOKING
async function deleteBooking(req, res) {
  try {
    const bookingExist = await Booking.findOne({
      where: { id_booking: req.params.id },
    });

    if (!bookingExist) {
      const error = new Error("Booking tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await Booking.destroy({
      where: { id_booking: req.params.id },
    });

    if (result === 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Booking Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
