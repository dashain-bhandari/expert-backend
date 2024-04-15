import express from "express";
import {
  createCompanyHandler,
  getCompanyHandler,
  updateCompanyHandler,
  getAllCompanyHandler,
  deleteCompanyHandler,
  getCompanyFromCategoryHandler,
} from "../controller/company.controller";
import { validate } from "../middleware/validateResource";
import {
  createCompanySchema,
  getCompanySchema,
  deleteCompanySchema,
  updateCompanySchema,
  getCompanyFromCategorySchema,
} from "../schema/company.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

router.post(
  "/",
  [
    upload.fields([{ name: "companyLogo", maxCount: 1 }]),
    validate(createCompanySchema),
  ],
  createCompanyHandler
);

router.patch(
  "/:companyId",
  [
    // requireAdmin,
    upload.fields([{ name: "companyLogo", maxCount: 1 }]),
    // validate(updateDealSchema)
  ],
  updateCompanyHandler
);

router.get(
  "/info/:categoryId",
  [validate(getCompanyFromCategorySchema)],
  getCompanyFromCategoryHandler
);
router.get("/:companyId", [validate(getCompanySchema)], getCompanyHandler);
router.get("/", getAllCompanyHandler);

router.delete(
  "/:companyId",
  [validate(deleteCompanySchema)],
  deleteCompanyHandler
);

export default router;
