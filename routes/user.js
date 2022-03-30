import express from "express";
import { getUser } from "../controllers/user/getById.js";

const router = express.Router({ mergeParams: true });

router.get("/:id", getUser);

export default router;
