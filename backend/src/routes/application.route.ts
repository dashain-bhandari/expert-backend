import express from "express";
import {
  createApplicationHandler,
  getApplicationHandler,
  getAllApplicationHandler,
  deleteApplicationHandler,
  getApplicationFromJobHandler,
} from "../controller/application.controller";
import { validate } from "../middleware/validateResource";
import {
  createApplicationSchema,
  deleteApplicationSchema,
  getApplicationFromJobSchema,
  getApplicationSchema,
} from "../schema/application.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
  "/",
  [
    upload.fields([{ name: "coverLetter", maxCount: 1 },{name:"document",maxCount:4}]),
    validate(createApplicationSchema),
  ],
  createApplicationHandler
);



router.get(
  "/info/:jobId",
  [validate(getApplicationFromJobSchema)],
  getApplicationFromJobHandler
);
router.get("/:applicationId", [validate(getApplicationSchema)], getApplicationHandler);
router.get("/", getAllApplicationHandler);

router.delete(
  "/:applicationId",
  [validate(deleteApplicationSchema),requireAdmin],
  deleteApplicationHandler
);

export default router;
