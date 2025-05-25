import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Schedule from "./ScheduleModel.js"; // Import model Schedule untuk FK

// Membuat tabel "seats"
const Seat = db.define(
  "seat", // nama tabel
  {
    id_seat: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_schedule: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Schedule, // FK ke tabel Schedule
        key: "id_schedule",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    seat_code: {
      type: Sequelize.STRING, // Contoh: A1, B5, dll.
      allowNull: false,
    },
  }
);

// Relasi: Seat milik Schedule
Seat.belongsTo(Schedule, { foreignKey: "id_schedule" });

db.sync().then(() => console.log("Database synced"));

export default Seat;
