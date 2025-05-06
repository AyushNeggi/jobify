import express from "express";
import { deleteCompany, getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);

router.route("/get").get(isAuthenticated, getCompany);

router.route("/get/:id").get(isAuthenticated, getCompanyById);

router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany); //singleUplaod is important otherwise after updating value will be store as undefined to receive file you have to use multer

router.route("/delete/:id").delete(isAuthenticated, deleteCompany);

export default router;
