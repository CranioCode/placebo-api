import express from "express";
import { completedAppointment } from "../controllers/appointment/comeplete.js";
import { confirmAppointment } from "../controllers/appointment/confirm.js";
import { deleteAppointmentById } from "../controllers/appointment/delete.js";
import {
  getAppointmentById,
  getAppointmentsByDoctor,
} from "../controllers/appointment/get.js";
import { newAppointment } from "../controllers/appointment/new.js";
import { authenticated, authenticatedDoctor } from "../middlewares/auth.js";

const router = express.Router({ mergeParams: true });

router.post("/new/:doctor", authenticated, newAppointment); // By User
router.get("/:id", getAppointmentById);
router.delete("/:id", authenticated, deleteAppointmentById);
router.post("/:id", authenticatedDoctor, completedAppointment);
router.post("/confirm/:id", authenticatedDoctor, confirmAppointment);
router.get("/doctor/:id", getAppointmentsByDoctor);

export default router;
