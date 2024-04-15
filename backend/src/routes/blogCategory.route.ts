import express from "express";
import {
  createCategoryHandler,
  getCategoryHandler,updateCategoryHandler,getAllCategoriesHandler,deleteCategoryHandler
} from "../controller/blogCategory.controller";
import { validate } from "../middleware/validateResource";
import {
  createCategorySchema,
  getCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
  "/",
  [
    requireAdmin,
    upload.fields([
      { name: "categoryImage", maxCount: 1 },
    ]),
  ],
  createCategoryHandler
);

router.patch(
  "/:categoryId",
  [
     requireAdmin,
    upload.fields([
      { name: "categoryImage", maxCount: 1 },
    ]),
    
  ],
  updateCategoryHandler
);

router.get("/:categoryId", [validate(getCategorySchema)], getCategoryHandler);
router.get("/", getAllCategoriesHandler);

router.delete("/:categoryId", [validate(deleteCategorySchema),requireAdmin], deleteCategoryHandler);

export default router;
