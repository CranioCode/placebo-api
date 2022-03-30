import express from "express";
import { completedAppointment } from "../controllers/appointment/comeplete.js";
import { confirmAppointment } from "../controllers/appointment/confirm.js";
import { deleteAppointmentById } from "../controllers/appointment/delete.js";
import {
  getAppointmentById,
  getAppointmentsByDoctor,
} from "../controllers/appointment/get.js";
import { newAppointment } from "../controllers/appointment/new.js";

const router = express.Router({ mergeParams: true });

router.post("/new/:doctor", newAppointment); // By User
router.get("/:id", getAppointmentById);
router.delete("/:id", deleteAppointmentById);
router.post("/:id", completedAppointment);
router.post("/confirm/:id", confirmAppointment);
router.get("/doctor/:id", getAppointmentsByDoctor);

export default router;
