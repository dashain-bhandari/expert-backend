import express from "express";
import {
  createContactsHandler,
  getContactsHandler,
  deleteContactHandler,
  getAllContactsHandler,
} from "../controller/contact.controller";
import { validate } from "../middleware/validateResource";
import {
  createContactSchema,
  getContactSchema,
  deleteContactSchema,
} from "../schema/contact.schema";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

router.post(
  "/",
  [
    // requireAdmin,
 validate(createContactSchema),
  ],
  createContactsHandler
);

router.get("/:contactId", [validate(getContactSchema)], getContactsHandler);
router.get("/", getAllContactsHandler);
router.delete(
  "/:contactId",
  [requireAdmin, validate(deleteContactSchema)],
  deleteContactHandler
);

export default router;
