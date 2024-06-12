import express from "express";
import { createPackageHandler, getAllPackageHandler, getPackageHandler, updatePackageHandler, deletePackageHandler } from "../controller/package.controller";
import { validate } from "../middleware/validateResource";
import { getPackageSchema, deletePackageSchema } from "../schema/package.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/", [requireAdmin, upload.fields([{ name: "normalImage", maxCount: 1 }])], createPackageHandler);
router.patch("/:packageId", [requireAdmin, upload.fields([{ name: "normalImage", maxCount: 1 }])], updatePackageHandler);
router.get("/:packageId", [validate(getPackageSchema)], getPackageHandler);
router.get("/", getAllPackageHandler);
router.delete("/:packageId", [validate(deletePackageSchema), requireAdmin], deletePackageHandler);

export default router;
