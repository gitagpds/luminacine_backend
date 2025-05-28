import Schedule from "../models/ScheduleModel.js";
import Movie from "../models/MovieModel.js";
import Seat from "../models/SeatModel.js";

// GET ALL SCHEDULES
async function getSchedules(req, res) {
  try {
    const schedules = await Schedule.findAll({
      include: [{ model: Movie }],
    });

    return res.status(200).json({
      status: "Success",
      message: "Schedules Retrieved",
      data: schedules,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET SCHEDULE BY ID
async function getScheduleById(req, res) {
  try {
    const schedule = await Schedule.findOne({
      where: { id_schedule: req.params.id },
      include: [{ model: Movie }, { model: Seat }],
    });

    if (!schedule) {
      const error = new Error("Schedule tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Schedule Retrieved",
      data: schedule,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET SCHEDULES BY MOVIE ID
async function getSchedulesByMovieId(req, res) {
  try {
    const schedules = await Schedule.findAll({
      where: { id_movie: req.params.movieId },
      include: [{ model: Movie }],
    });

    return res.status(200).json({
      status: "Success",
      message: "Schedules for movie retrieved",
      data: schedules,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE SCHEDULE
async function createSchedule(req, res) {
  return createScheduleHandler(req, res);
}

// CREATE SCHEDULE FOR MOVIE
async function createScheduleForMovie(req, res) {
  req.body.id_movie = req.params.movieId;
  return createScheduleHandler(req, res);
}

// Handler untuk membuat schedule (digunakan di 2 endpoint)
async function createScheduleHandler(req, res) {
  try {
    const {
      id_movie,
      cinema_name,
      studio,
      date,
      time,
      price,
    } = req.body;

    if (!id_movie || !cinema_name || !studio || !date || !time || !price) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    const newSchedule = await Schedule.create(req.body);

    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsToCreate = [];

    for (const row of rows) {
      for (let number = 1; number <= 14; number++) {
        seatsToCreate.push({
          id_schedule: newSchedule.id_schedule,
          seat_code: '${row}${number}',
          status: 'available',
        });
      }
    }

    await Seat.bulkCreate(seatsToCreate);

    return res.status(201).json({
      status: "Success",
      message: "Schedule Created with seats generated",
      data: newSchedule,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// UPDATE SCHEDULE
async function updateSchedule(req, res) {
  return updateScheduleHandler(req, res);
}

// UPDATE SCHEDULE FOR MOVIE
async function updateScheduleForMovie(req, res) {
  req.body.id_movie = req.params.movieId;
  return updateScheduleHandler(req, res);
}

// Handler untuk update schedule
async function updateScheduleHandler(req, res) {
  try {
    const {
      id_movie,
      cinema_name,
      studio,
      date,
      time,
      price,
    } = req.body;

    if (!id_movie || !cinema_name || !studio || !date || !time || !price) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    const ifScheduleExist = await Schedule.findOne({
      where: { id_schedule: req.params.id },
    });

    if (!ifScheduleExist) {
      const error = new Error("Schedule tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await Schedule.update(req.body, {
      where: { id_schedule: req.params.id },
    });

    if (result[0] === 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Schedule Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE SCHEDULE
async function deleteSchedule(req, res) {
  try {
    const ifScheduleExist = await Schedule.findOne({
      where: { id_schedule: req.params.id },
    });

    if (!ifScheduleExist) {
      const error = new Error("Schedule tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await Schedule.destroy({
      where: { id_schedule: req.params.id },
    });

    if (result === 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Schedule Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export {
  getSchedules,
  getScheduleById,
  getSchedulesByMovieId,
  createSchedule,
  createScheduleForMovie,
  updateSchedule,
  updateScheduleForMovie,
  deleteSchedule,
};
