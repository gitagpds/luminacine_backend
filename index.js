import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import UserRoute from "./routes/UserRoute.js";
import BookingRoute from "./routes/BookingRoute.js";
import BookingSeatRoute from "./routes/BookingSeatRoute.js";
import MovieRoute from "./routes/MovieRoute.js";
import ScheduleRoute from "./routes/ScheduleRoute.js";
import SeatRoute from "./routes/SeatRoute.js";

const app = express();

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // <- ganti sesuai alamat front-end kamu
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => res.render("index"));

// Routes
app.use(UserRoute);
app.use(BookingRoute);
app.use(BookingSeatRoute);
app.use(MovieRoute);
app.use(ScheduleRoute);
app.use(SeatRoute);

app.listen(5000, () => console.log("Server connected"));
