import express from "express";
import { getAllDoctors } from "../controllers/doctor/getAll.js";
import { getDoctorById } from "../controllers/doctor/getById.js";
import { getDoctorByName } from "../controllers/doctor/getByName.js";

import specialitiesRouter from "./specialities.js";

const router = express.Router();

router.use("/specialities", specialitiesRouter);
router.get("/", getAllDoctors);
router.get("/search", getDoctorByName);
router.get("/:id", getDoctorById);

export default router;
