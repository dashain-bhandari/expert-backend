import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createEnquiryHandler, deletePackageEnquiryHandler, getAllPackageEnquiriesHandler, getPackageEnquiryHandler, getPackageEnquiryInfoHandler } from "../controller/packageEnquiry.controller";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
    "/",
    [ 
      upload.fields([{name:'document',maxCount:4}]),
    ],
    createEnquiryHandler
  );
  
router.get(
    "/:packageId",
    getPackageEnquiryHandler
)

router.get("/",
getAllPackageEnquiriesHandler
)

router.delete("/:enquiryId",
requireAdmin,
deletePackageEnquiryHandler
)

router.get(
  "/packageenquiry/:enquiryId",
  getPackageEnquiryInfoHandler
)

export default router;