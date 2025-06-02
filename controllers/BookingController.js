import Booking from "../models/BookingModel.js";
import Seat from "../models/SeatModel.js";
import Schedule from "../models/ScheduleModel.js";
import Movie from "../models/MovieModel.js";
import User from "../models/UserModel.js";
import BookingSeat from "../models/BookingSeatModel.js"; // Tambahan penting

// GET ALL BOOKINGS
export async function getBookings(req, res) {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Seat,
          through: {
            attributes: ['createdAt', 'updatedAt', 'id_booking', 'id_seat'],
          },
        },
        {
          model: Schedule,
          include: [Movie],
        },
        {
          model: User,
          attributes: ['id_user', 'name', 'email'],
        },
      ],
    });

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
export async function getBookingById(req, res) {
  try {
    const booking = await Booking.findOne({
      where: { id_booking: req.params.id },
      include: [
        { model: Seat },
        {
          model: Schedule,
          include: [Movie],
        },
        {
          model: User,
          attributes: ['id_user', 'name', 'email'],
        },
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
export async function createBooking(req, res) {
  try {
    const { id_user, id_schedule, seats, total_price } = req.body;

    if (!id_user || !id_schedule || !seats || seats.length === 0 || !total_price) {
      const error = new Error("Field cannot be empty and seats cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    const newBooking = await Booking.create({ id_user, id_schedule, total_price });
    await newBooking.setSeats(seats);

    const bookingWithSeats = await Booking.findOne({
      where: { id_booking: newBooking.id_booking },
      include: [
        { model: Seat },
        { model: Schedule, include: [Movie] },
        { model: User, attributes: ['id_user', 'name', 'email'] }
      ],
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
export async function updateBooking(req, res) {
  try {
    const { id_user, id_schedule, seats, total_price } = req.body;

    if (!id_user || !id_schedule || !seats || seats.length === 0 || !total_price) {
      const error = new Error("Field cannot be empty and seats cannot be empty 😠");
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

    // Update main booking data
    const result = await Booking.update(
      { id_user, id_schedule, total_price },
      { where: { id_booking: req.params.id } }
    );

    if (result[0] === 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    // Delete old seat relations
    await BookingSeat.destroy({
      where: { id_booking: req.params.id },
    });

    // Insert new seat relations
    for (const seatId of seats) {
      await BookingSeat.create({
        id_booking: req.params.id,
        id_seat: seatId,
      });
    }

    // Return updated booking
    const updatedBooking = await Booking.findOne({
      where: { id_booking: req.params.id },
      include: [
        { model: Seat },
        { model: Schedule, include: [Movie] },
        { model: User, attributes: ['id_user', 'name', 'email'] }
      ],
    });

    return res.status(200).json({
      status: "Success",
      message: "Booking Updated",
      data: updatedBooking,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}
