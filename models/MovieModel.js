import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const Movie = db.define(
    "movie",
    {
        id_movie: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sinopsis: Sequelize.TEXT,
        genre: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        poster_url: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
        release_date: Sequelize.DATEONLY,
    }
);

export default Movie;
