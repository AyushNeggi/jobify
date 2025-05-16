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

dotenv.config({});                                   //This line loads environment variables from a .env file into process.env

const app = express();

//middleware
app.use(express.json());                                       //This middleware tells Express to accept JSON data in the body of requests
app.use(express.urlencoded({ extended: true }));              //This allows your app to read data from HTML forms 
app.use(cookieParser());                                      // This middleware helps in parsing cookies sent by the client.


const corsOptions = {                                                                //  You're specifying allowed origins (i.e., which frontend domains can talk to your backend credentials: true means the browser can send cookies/headers with requests.
  origin: [ "http://localhost:5173", "https://jobify-4pp2.onrender.com" ],
  credentials: true,
};

app.use(cors(corsOptions)); // Applies CORS settings to all incoming requests

const PORT = process.env.PORT || 3000;

const _dirname = path.resolve(); //This gets the absolute path of your current directory

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
