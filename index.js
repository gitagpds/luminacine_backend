import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./models/index.js";

// IMPORT ROUTE
import UserRoute from "./routes/UserRoute.js";
import BookingRoute from "./routes/BookingRoute.js";
import BookingSeatRoute from "./routes/BookingSeatRoute.js";
import MovieRoute from "./routes/MovieRoute.js";
import ScheduleRoute from "./routes/ScheduleRoute.js";
import SeatRoute from "./routes/SeatRoute.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://luminacine-dot-g-07-450802.uc.r.appspot.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use(UserRoute);
app.use(BookingRoute);
app.use(BookingSeatRoute);
app.use(MovieRoute);
app.use(ScheduleRoute);
app.use(SeatRoute);

console.log("ENV PORT:", process.env.PORT); // Tambahan untuk debugging di Cloud Run
app.listen(port, () => console.log(`Server connected on port ${port}`));
