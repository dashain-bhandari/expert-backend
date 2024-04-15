const express = require("express");
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import {createTestimonialSchema,updateTestimonialSchema,deleteTestimonialSchema, getTestimonialSchema,} from "../schema/testimonial.schema";
import { createTestimonialHandler,deleteTestimonialHandler,getAllTestimonialHandler,getTestimonialHandler,updateTestimonialHandler } from "../controller/testimonial.controller";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
  "/",
  [
    requireAdmin,
    upload.fields([{ name: "image", maxCount: 1 }]),
    validate(createTestimonialSchema),
  ],
  createTestimonialHandler
);

router.patch(
  "/:testimonialId",
  [
    requireAdmin,
    upload.fields([{ name: "image", maxCount: 1 }]),
    //  validate(updateTestimonialSchema),
  ],
 updateTestimonialHandler
);

router.get('/:testimonialId',[validate(getTestimonialSchema)],getTestimonialHandler);
router.delete('/:testimonialId',[requireAdmin, validate(deleteTestimonialSchema)],deleteTestimonialHandler);
router.get('/',getAllTestimonialHandler);

export default router;