import express from "express";

import { deleteTestimonial } from "../controllers/testimonial/delete.js";
import { getTestimonial } from "../controllers/testimonial/get.js";
import { newTestimonial } from "../controllers/testimonial/new.js";
import { authenticated } from "../middlewares/auth.js";

const router = express.Router({ mergeParams: true });

router.post("/new/:doctorId", authenticated, newTestimonial);
router.get("/:id", getTestimonial);
router.delete("/:id", authenticated, deleteTestimonial);

export default router;
