import Movie from "../models/MovieModel.js";
import { bucket } from "../config/gcs.js";  // import bucket GCS

// Helper function upload file ke GCS
async function uploadToGCS(file) {
  return new Promise((resolve, reject) => {
    if (!file) reject("No file");

    // Nama unik agar tidak bentrok
    const gcsFileName = Date.now() + "-" + file.originalname;

    const fileUpload = bucket.file(gcsFileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false,
    });

    stream.on("error", (err) => {
      reject(err);
    });

    stream.on("finish", async () => {
      // Buat file tersebut bisa diakses publik
      await fileUpload.makePublic();

      // URL public file
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(publicUrl);
    });

    // Mulai upload file buffer ke GCS
    stream.end(file.buffer);
  });
}

// UPDATE MOVIE DENGAN UPLOAD POSTER
async function updateMoviePoster(req, res) {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({ where: { id_movie: id } });

    if (!movie) {
      const error = new Error("Movie tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    if (!req.file) {
      const error = new Error("File gambar tidak ditemukan");
      error.statusCode = 400;
      throw error;
    }

    // Upload ke GCS
    const imageUrl = await uploadToGCS(req.file);

    // Update database dengan URL gambar
    await Movie.update({ poster_url: imageUrl }, { where: { id_movie: id } });

    return res.status(200).json({
      status: "Success",
      message: "Poster movie berhasil diupdate",
      poster_url: imageUrl,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET ALL MOVIES
async function getMovies(req, res) {
  try {
    const movies = await Movie.findAll();

    return res.status(200).json({
      status: "Success",
      message: "Movies Retrieved",
      data: movies,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET MOVIE BY ID
async function getMovieById(req, res) {
  try {
    const movie = await Movie.findOne({ where: { id_movie: req.params.id } });

    if (!movie) {
      const error = new Error("Movie tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Movie Retrieved",
      data: movie,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE MOVIE
async function createMovie(req, res) {
  try {
    // Minimal title wajib ada
    if (!req.body.title) {
      const error = new Error("Field 'title' tidak boleh kosong 😠");
      error.statusCode = 400;
      throw error;
    }

    const newMovie = await Movie.create(req.body);

    return res.status(201).json({
      status: "Success",
      message: "Movie Created",
      data: newMovie,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// UPDATE MOVIE
async function updateMovie(req, res) {
  try {
    const ifMovieExist = await Movie.findOne({ where: { id_movie: req.params.id } });

    if (!ifMovieExist) {
      const error = new Error("Movie tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await Movie.update(req.body, {
      where: { id_movie: req.params.id },
    });

    if (result[0] === 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Movie Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE MOVIE
async function deleteMovie(req, res) {
  try {
    const ifMovieExist = await Movie.findOne({ where: { id_movie: req.params.id } });

    if (!ifMovieExist) {
      const error = new Error("Movie tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await Movie.destroy({ where: { id_movie: req.params.id } });

    if (result === 0) {
      const error = new Error("Tidak ada data yang dihapus");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Movie Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  updateMoviePoster,
};
