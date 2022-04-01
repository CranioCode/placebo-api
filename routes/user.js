import express from "express";
import { authenticate } from "passport/lib";
import { getUser } from "../controllers/user/getById.js";
import { updateUser } from "../controllers/user/update.js";

const router = express.Router({ mergeParams: true });

router.patch("/", authenticate, updateUser);
router.get("/:id", getUser);

export default router;
