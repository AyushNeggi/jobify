//to create server
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [ "http://localhost:5173", "https://jobify-4pp2.onrender.com" ],
  credentials: true,
};

app.use(cors(corsOptions)); // Applies CORS settings to all incoming requests

const PORT = process.env.PORT || 3000;

const _dirname = path.resolve();

app.use("/api/v1/user", userRoute);

app.use("/api/v1/company", companyRoute);

app.use("/api/v1/job", jobRoute);

app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html")); //all other roots other than above route or frontend route will be served from frontend
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server running at port ${PORT}`);
});
