import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Booking from "./BookingModel.js";
import Seat from "./SeatModel.js";

const BookingSeat = db.define("booking_seats", {
  id_booking: {
    type: Sequelize.INTEGER,
    references: {
      model: Booking,
      key: "id_booking",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    primaryKey: true,
  },
  id_seat: {
    type: Sequelize.INTEGER,
    references: {
      model: Seat,
      key: "id_seat",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    primaryKey: true,
  },
});

export default BookingSeat;
