import express from "express";
import {
  createDealHandler,
  getDealHandler,
  updateDealHandler,
  getAllDealHandler,
  deleteDealHandler,
  getDealFromCategoryHandler,
} from "../controller/deal1.controller";
import { validate } from "../middleware/validateResource";
import {
  createDealSchema,
  getDealSchema,
  deleteDealSchema,
  updateDealSchema,
  getDealFromCategorySchema,
} from "../schema/deal1.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
  "/",
  [
    requireAdmin,
    upload.fields([
      { name: "companyLogo", maxCount: 1 },
      { name: "contentImage", maxCount: 1 },
    ]),
    validate(createDealSchema),
  ],
  createDealHandler
);

router.patch(
  "/:dealId",
  [
     requireAdmin,
    upload.fields([
      { name: "companyLogo", maxCount: 1 },
      { name: "contentImage", maxCount: 1 },
    ]),
    // validate(updateDealSchema)
  ],
  updateDealHandler
);
router.get(
  "/info/:categoryId",
  [validate(getDealFromCategorySchema)],
  getDealFromCategoryHandler
);
router.get("/:dealId", [validate(getDealSchema)], getDealHandler);
router.get("/", getAllDealHandler);

router.delete("/:dealId", [requireAdmin,validate(deleteDealSchema)], deleteDealHandler);

export default router;
