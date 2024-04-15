import express from "express";
import {
  createJobInformationHandler,
  getJobInformationHandler,
  getAllJobInformationHandler,
  deleteJobInformationHandler,
  updateJobInformationHandler
} from "../controller/jobInformation.controller";
import { validate } from "../middleware/validateResource";
import {
  createJobInformationSchema,
  deleteJobInformationSchema,
  getJobInformationSchema,
  updateJobInformationSchema
} from "../schema/jobInformation.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
  "/",
  [
    requireAdmin,
    upload.fields([{ name: "contentImage", maxCount: 1 }]),
    validate(createJobInformationSchema),
  ],
  createJobInformationHandler
);
router.patch(
  "/:jobId",
  [
     requireAdmin,
    upload.fields([
     
      { name: "contentImage", maxCount: 1 },
    ]),
    // validate(updateDealSchema)
  ],
  updateJobInformationHandler
);

router.get("/:jobId", [validate(getJobInformationSchema)], getJobInformationHandler);
router.get("/", getAllJobInformationHandler);

router.delete(
  "/:jobId",
  [validate(deleteJobInformationSchema),requireAdmin],
  deleteJobInformationHandler
);

export default router;
