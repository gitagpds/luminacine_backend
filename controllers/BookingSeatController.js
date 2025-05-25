import BookingSeat from "../models/BookingSeatModel.js";

// GET all booking_seats (biasanya jarang dipakai langsung)
async function getBookingSeats(req, res) {
  try {
    const bookingSeats = await BookingSeat.findAll();
    return res.status(200).json({
      status: "Success",
      message: "Booking Seats Retrieved",
      data: bookingSeats,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export { getBookingSeats };
