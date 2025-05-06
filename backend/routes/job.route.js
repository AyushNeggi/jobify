import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controllers.js";

const router = express.Router();

router.route("/createjob").post(isAuthenticated, postJob);

router.route("/get").get(getAllJobs);

router.route("/get/:id").get(isAuthenticated, getJobById);

router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

router.route("/delete/:id").delete(isAuthenticated, deleteJob);

export default router;
