import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createEnquiryHandler, deleteServiceEnquiryHandler, getAllServiceEnquiriesHandler, getServiceEnquiryHandler, getServiceEnquiryInfoHandler } from "../controller/serviceEnquiry.controller";
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
    "/:serviceId",
    getServiceEnquiryHandler
)

router.get("/",
getAllServiceEnquiriesHandler
)

router.delete("/:enquiryId",
requireAdmin,
deleteServiceEnquiryHandler
)

router.get(
  "/serviceenquiry/:enquiryId",
  getServiceEnquiryInfoHandler
)

export default router;