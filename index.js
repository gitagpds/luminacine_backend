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

dotenv.config();
const app = express();
app.set("view engine", "ejs");

// ✅ Middleware manual untuk CORS & preflight
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://luminacine-dot-g-07-450802.uc.r.appspot.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Cegah error preflight di Cloud Run
  }

  next();
});

app.use(cookieParser());

// Konfigurasi CORS tambahan (opsional, tetap bisa digunakan)
const corsOptions = {
  origin: 'https://luminacine-dot-g-07-450802.uc.r.appspot.com',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();

    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
