import Seat from "../models/SeatModel.js";

// GET all seats (optionally filter by schedule)
async function getSeats(req, res) {
  try {
    const { scheduleId } = req.query;
    const condition = scheduleId ? { id_schedule: scheduleId } : {};

    const seats = await Seat.findAll({ where: condition });

    return res.status(200).json({
      status: "Success",
      message: "Seats Retrieved",
      data: seats,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE seat
async function createSeat(req, res) {
  try {
    const { id_schedule, seat_code } = req.body;

    if (!id_schedule || !seat_code) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    const newSeat = await Seat.create({ id_schedule, seat_code });

    return res.status(201).json({
      status: "Success",
      message: "Seat Created",
      data: newSeat,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// UPDATE seat
async function updateSeat(req, res) {
  try {
    const { id_schedule, seat_code } = req.body;

    if (!id_schedule || !seat_code) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    const seatExist = await Seat.findOne({ where: { id_seat: req.params.id } });

    if (!seatExist) {
      const error = new Error("Seat tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await Seat.update(req.body, { where: { id_seat: req.params.id } });

    if (result[0] === 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Seat Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE seat
async function deleteSeat(req, res) {
  try {
    const seatExist = await Seat.findOne({ where: { id_seat: req.params.id } });

    if (!seatExist) {
      const error = new Error("Seat tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await Seat.destroy({ where: { id_seat: req.params.id } });

    if (result === 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Seat Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export { getSeats, createSeat, updateSeat, deleteSeat };
