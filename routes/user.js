import express from "express";
import { authenticated } from "../middlewares/auth.js";
import { getUser } from "../controllers/user/getById.js";
import { updateUser } from "../controllers/user/update.js";

const router = express.Router({ mergeParams: true });

router.patch("/", authenticated, updateUser);
router.get("/:id", getUser);

export default router;
