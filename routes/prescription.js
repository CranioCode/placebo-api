import express from "express";
import { deletePrescription } from "../controllers/prescription/delete.js";
import {
  getPrescriptionById,
  getPrescriptionByUser,
} from "../controllers/prescription/get.js";
import { newPrescription } from "../controllers/prescription/new.js";
import { authenticatedDoctor } from "../middlewares/auth.js";

const router = express.Router();

router.use("/new", authenticatedDoctor, newPrescription);
router.get("/:id", getPrescriptionById);
router.get("/user/:id", authenticatedDoctor, getPrescriptionByUser);
router.delete("/:id", authenticatedDoctor, deletePrescription);

export default router;
