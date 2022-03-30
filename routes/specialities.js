import express from "express";
import { getSpeciality } from "../controllers/doctor/speciality.js";

const router = express.Router({ mergeParams: true });

// router.get("/", getAllSpecialities);
router.get("/search", getSpeciality);

export default router;
