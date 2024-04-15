import express from "express";
import {
  createDealFaqHandler,
  getDealFaqHandler,
  getAllDealFaqHandler,
  updateDealFaqHandler,
  deleteDealFaqHandler,
  getParticularDealFaqHandler,
} from "../controller/dealFaq.controller";
import { validate } from "../middleware/validateResource";
import {
  createDealFaqSchema,
  getDealFaqSchema,
  deleteDealFaqSchema,
  updateDealFaqSchema,
} from "../schema/dealFaq.schema";
import { requireAdmin } from "../middleware/requireAdmin";
import { deleteFaqSchema } from "../schema/faq.schema";

const router = express.Router();

router.post(
  "/",
  [
    requireAdmin,
     validate(createDealFaqSchema),
  ],
  createDealFaqHandler
);

router.get("/:dealId", getDealFaqHandler);
router.get("/dealfaq/:dealFaqId", getParticularDealFaqHandler);
router.get("/", getAllDealFaqHandler);
router.patch("/:dealFaqId", //[validate(updateDealFaqSchema)],
 updateDealFaqHandler);
router.delete(
  "/:dealFaqId",
  [requireAdmin,validate(deleteDealFaqSchema)],
  deleteDealFaqHandler
);

export default router;
