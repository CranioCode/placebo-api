import express from "express";
import { getDiseaseBySymptom } from "../controllers/disease/getBySymptom.js";
import { addNewDisease } from "../controllers/disease/new.js";

const router = express.Router();

router.get("/search", getDiseaseBySymptom);
router.post("/new", addNewDisease);

export default router;
