import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./models/index.js";
import UserRoute from "./routes/UserRoute.js";
import BookingRoute from "./routes/BookingRoute.js";
import BookingSeatRoute from "./routes/BookingSeatRoute.js";
import MovieRoute from "./routes/MovieRoute.js";
import ScheduleRoute from "./routes/ScheduleRoute.js";
import SeatRoute from "./routes/SeatRoute.js";

const app = express();
app.set("view engine", "ejs");
app.use(cookieParser());

// CORS Configuration - UBAH BAGIAN INI
app.use(
  cors({
    origin: [
      "http://localhost:3000",                           // untuk development
      "https://g-07-450802.uc.r.appspot.com"           // untuk production
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
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

const PORT = process.env.PORT;
