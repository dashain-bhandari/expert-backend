import express from "express";
import {
  createDealHandler,
  getDealHandler,
  updateDealHandler,
  getAllDealHandler,
  deleteDealHandler,
  getDealFromCompanyHandler,
} from "../controller/deal.controller";
import { validate } from "../middleware/validateResource";
import {
  createDealSchema,
  getDealSchema,
  deleteDealSchema,
  updateDealSchema,
  getDealFromCompanySchema,
} from "../schema/deal.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

router.post(
  "/",
  [ requireAdmin,
    upload.fields([
      { name: "companyLogo", maxCount: 1 },
      { name: "contentImage", maxCount: 1 },
    ]),
    validate(createDealSchema)
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
router.get("/info/:companyId",[validate(getDealFromCompanySchema)], getDealFromCompanyHandler);
router.get("/:dealId", [validate(getDealSchema)], getDealHandler);
router.get("/", getAllDealHandler);

router.delete("/:dealId", [validate(deleteDealSchema)], deleteDealHandler);

export default router;
