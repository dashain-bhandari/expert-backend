import express from "express";
import {
  createEmailHandler,
  getEmailHandler,
  deleteEmailHandler,
  getAllEmailHandler,
  sendEmailHandler,
} from "../controller/email.controller";
import { validate } from "../middleware/validateResource";
import {
  createEmailSchema,
  getEmailSchema,
  deleteEmailSchema,
} from "../schema/email.schema";
import { authVerify } from "../middleware/authVerify";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
  "/",
  [
    upload.fields([{ name: "documents", maxCount: 4 }]),
    validate(createEmailSchema),
   
  ],
  sendEmailHandler
);

router.get(
  "/:emailId",
  [validate(getEmailSchema)],
  getEmailHandler
);
router.get("/",  getAllEmailHandler);
router.delete(
  "/:emailId",
  [ validate(deleteEmailSchema), requireAdmin
  ],
  deleteEmailHandler
);

export default router;
