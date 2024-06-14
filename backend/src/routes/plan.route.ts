import express from "express";
import { createPlanHandler, getPlanHandler, getAllPlanHandler, deletePlanHandler, updatePlanHandler } from "../controller/plan.controller";
import { validate } from "../middleware/validateResource";
import { deletePlanSchema, getPlanSchema } from "../schema/plan.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/", [requireAdmin, upload.fields([{ name: "contentImage", maxCount: 1 }])], createPlanHandler);
router.patch("/:planId", [requireAdmin, upload.fields([{ name: "contentImage", maxCount: 1 }])], updatePlanHandler);
router.get("/:planId", [validate(getPlanSchema)], getPlanHandler);
router.get("/", getAllPlanHandler);
router.delete("/:planId", [validate(deletePlanSchema), requireAdmin], deletePlanHandler);

export default router;
