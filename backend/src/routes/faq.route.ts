import express from "express";
import {
  createFaqHandler,
  updateFaqHandler,
  getFaqHandler,
  deleteFaqHandler,
  getAllFaqHandler,
} from "../controller/faq.controller";
import { validate } from "../middleware/validateResource";
import {
  createFaqSchema,
  getFaqSchema,
  deleteFaqSchema,
  updateFaqSchema,
} from "../schema/faq.schema";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
  "/",
  [
    requireAdmin,
    // validate(createFaqSchema),
  ],
  createFaqHandler
);

router.patch("/:faqId", requireAdmin,
// [validate(updateFaqSchema)], 
updateFaqHandler);
router.get("/:faqId", [validate(getFaqSchema)], getFaqHandler);
router.get("/", getAllFaqHandler);
router.delete(
  "/:faqId",
  [requireAdmin, validate(deleteFaqSchema)],
  deleteFaqHandler
);

export default router;
