import express from "express";
import {
  createServiceHandler,
  getAllServiceHandler,
  getServiceHandler,
  updateServiceHandler,
  deleteServiceHandler,
} from "../controller/service.controller";
import { validate } from "../middleware/validateResource";
import {
  createServiceSchema,
  getServiceSchema,
  deleteServiceSchema,
  updateServiceSchema,
} from "../schema/service.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

router.post(
  "/",
  [
    upload.fields([
      { name: "bgImage", maxCount: 1 },
      { name: "normalImage", maxCount: 1 },
    ]),
  ],
  createServiceHandler
);

export default router;
