import express from "express";
import {
  createBlogHandler,
  getBlogHandler,updateBlogHandler,getAllBlogsHandler,deleteBlogHandler, getBlogFromCategoryHandler
} from "../controller/blog.controller";
import { validate } from "../middleware/validateResource";
import {
  createBlogSchema,
  getBlogSchema,
  deleteBlogSchema,
  updateBlogSchema,
  getBlogFromCategorySchema,
} from "../schema/blog.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
  "/",
  [
    upload.fields([
      { name: "contentImage", maxCount: 1 },
      { name: "authorImage", maxCount: 1 },
    ]),
    requireAdmin
  ],
  createBlogHandler
);

router.patch(
  "/:blogId",
  [
     requireAdmin,
    upload.fields([
      { name: "contentImage", maxCount: 1 },
      { name: "authorImage", maxCount: 1 },
    ]),
    // validate(updateDealSchema)
  ],
  updateBlogHandler
);


router.get(
  "/info/:categoryId",
  [validate(getBlogFromCategorySchema)],
  getBlogFromCategoryHandler
);
router.get("/:blogId", [validate(getBlogSchema)], getBlogHandler);
router.get("/", getAllBlogsHandler);

router.delete("/:blogId", [validate(deleteBlogSchema),requireAdmin], deleteBlogHandler);

export default router;
