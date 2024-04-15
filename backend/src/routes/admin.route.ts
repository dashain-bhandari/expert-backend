import express from "express";
import { changeRoles, loginAdminHandler } from "../controller/admin.controller";
import { validate } from "../middleware/validateResource";

import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.patch("/:userId", requireSuperAdmin, changeRoles);

router.post("/login", loginAdminHandler);

export default router;
