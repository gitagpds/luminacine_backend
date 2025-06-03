import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./models/index.js";
import sequelize from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import BookingRoute from "./routes/BookingRoute.js";
import BookingSeatRoute from "./routes/BookingSeatRoute.js";
import MovieRoute from "./routes/MovieRoute.js";
import ScheduleRoute from "./routes/ScheduleRoute.js";
import SeatRoute from "./routes/SeatRoute.js";

const app = express();
app.set("view engine", "ejs");

// Daftar origin yang diizinkan (dev dan production)
const allowedOrigins = [
  "http://localhost:3000",
  "https://luminacine-dot-g-07-450802.uc.r.appspot.com",
];

// Middleware CORS yang direkomendasikan
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => res.render("index"));

// Routes
app.use(UserRoute);
app.use(BookingRoute);
app.use(BookingSeatRoute);
app.use(MovieRoute);
app.use(ScheduleRoute);
app.use(SeatRoute);

const start = async () => {
  try {
    console.log("Trying to authenticate database...");
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();
    console.log("Database synced");

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
