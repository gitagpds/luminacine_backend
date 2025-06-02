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
