import express from "express";
import {
  getMedicineById,
  getMedicineByName,
} from "../controllers/medicine/get.js";
import { newMedicine } from "../controllers/medicine/new.js";
import { authenticatedDoctor } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", authenticatedDoctor, newMedicine);
router.get("/:id", getMedicineById);
router.get("/search", getMedicineByName);

export default router;
