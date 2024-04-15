import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createEnquiryHandler, deleteDealEnquiryHandler, getAllDealEnquiriesHandler, getDealEnquiryHandler, getDealEnquiryInfoHandler } from "../controller/dealEnquiry.controller";
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
    "/:dealId",
    getDealEnquiryHandler
)

router.get("/",requireAdmin,
getAllDealEnquiriesHandler
)

router.delete("/:enquiryId",requireAdmin,
deleteDealEnquiryHandler
)
router.get(
  "/dealenquiry/:enquiryId",
  requireAdmin,
  getDealEnquiryInfoHandler
)
export default router;