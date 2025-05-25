import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Schedule from "./ScheduleModel.js";

const Booking = db.define(
  "booking",
  {
    id_booking: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_schedule: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Schedule,
        key: "id_schedule",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    total_price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }
);

export default Booking;
