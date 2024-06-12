import express from "express";
import { createServiceHandler, getAllServiceHandler, getServiceHandler, updateServiceHandler, deleteServiceHandler } from "../controller/service.controller";
import { validate } from "../middleware/validateResource";
import { getServiceSchema, deleteServiceSchema } from "../schema/service.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/", [requireAdmin, upload.fields([{ name: "normalImage", maxCount: 1 }])], createServiceHandler);
router.patch("/:serviceId", [requireAdmin, upload.fields([{ name: "normalImage", maxCount: 1 }])], updateServiceHandler);
router.get("/:serviceId", [validate(getServiceSchema)], getServiceHandler);
router.get("/", getAllServiceHandler);
router.delete("/:serviceId", [validate(deleteServiceSchema), requireAdmin], deleteServiceHandler);

export default router;
