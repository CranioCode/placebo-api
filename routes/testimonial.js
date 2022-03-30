import express from "express";

import { deleteTestimonial } from "../controllers/testimonial/delete.js";
import { getTestimonial } from "../controllers/testimonial/get.js";
import { newTestimonial } from "../controllers/testimonial/new.js";

const router = express.Router({ mergeParams: true });

router.post("/new", newTestimonial);
router.get("/:id", getTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
