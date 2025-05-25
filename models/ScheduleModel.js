import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const Schedule = db.define(
    "schedule",
    {
        id_schedule: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_movie: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cinema_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        studio: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        time: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }
);

export default Schedule;
