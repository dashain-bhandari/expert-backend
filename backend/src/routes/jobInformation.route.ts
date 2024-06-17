import express from "express";
import { createJobInformationHandler, getJobInformationHandler, getAllJobInformationHandler, deleteJobInformationHandler, updateJobInformationHandler } from "../controller/jobInformation.controller";
import { validate } from "../middleware/validateResource";
import { deleteJobInformationSchema, getJobInformationSchema } from "../schema/jobInformation.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/", [requireAdmin], createJobInformationHandler);
router.patch("/:jobId", [requireAdmin], updateJobInformationHandler);
router.get("/:jobId", [validate(getJobInformationSchema)], getJobInformationHandler);
router.get("/", getAllJobInformationHandler);
router.delete("/:jobId", [validate(deleteJobInformationSchema), requireAdmin], deleteJobInformationHandler);

export default router;
