import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./models/index.js";

// ROUTE
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
    origin: [
      "http://localhost:3000", // frontend local
      "https://g-07-450802.uc.r.appspot.com", // frontend deployed
    ],
    credentials: true,
  })
);
app.use(express.json());

// Home route
app.get("/", (req, res) => res.render("index"));

// API routes
app.use(UserRoute);
app.use(BookingRoute);
app.use(BookingSeatRoute);
app.use(MovieRoute);
app.use(ScheduleRoute);
app.use(SeatRoute);

// Gunakan PORT dari environment variable (Cloud Run mengatur ini otomatis)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
