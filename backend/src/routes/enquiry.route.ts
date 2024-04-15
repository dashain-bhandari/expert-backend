import express from "express";

import { deleteEnquiryHandler, getAllEnquiriesHandler, getEnquiryHandler, updateEnquiryHandler } from "../controller/enquiry.controller";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.get(
    "/",
    getAllEnquiriesHandler
  )

  router.get('/:enquiryId',
  getEnquiryHandler
  )
  router.patch('/:enquiryId', requireAdmin,updateEnquiryHandler);
  router.delete('/:enquiryId',requireAdmin,deleteEnquiryHandler);
  export default router;