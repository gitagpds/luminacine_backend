import Booking from "./BookingModel.js";
import BookingSeat from "./BookingSeatModel.js";
import Movie from "./MovieModel.js";
import Schedule from "./ScheduleModel.js";
import Seat from "./SeatModel.js";
import User from "./UserModel.js";

// Relasi 1 Movie memiliki banyak Schedule
Movie.hasMany(Schedule, { foreignKey: "id_movie" });
Schedule.belongsTo(Movie, { foreignKey: "id_movie" });

// Relasi 1 Schedule memiliki banyak Seat
Schedule.hasMany(Seat, { foreignKey: "id_schedule" });
Seat.belongsTo(Schedule, { foreignKey: "id_schedule" });

// Relasi Booking ke User (banyak Booking dimiliki 1 User)
Booking.belongsTo(User, { foreignKey: "id_user" });

// Relasi Booking ke Schedule (banyak Booking dimiliki 1 Schedule)
Booking.belongsTo(Schedule, { foreignKey: "id_schedule" });

// Relasi Many-to-Many antara Booking dan Seat melalui tabel BookingSeat (join table)
Booking.belongsToMany(Seat, { through: BookingSeat, foreignKey: "id_booking" });
Seat.belongsToMany(Booking, { through: BookingSeat, foreignKey: "id_seat" });

export { Movie, Schedule, Seat, Booking, BookingSeat, User };
