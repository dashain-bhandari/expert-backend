import express from "express";
import { createServiceHandler,getAllServiceHandler,getServiceHandler,updateServiceHandler,deleteServiceHandler } from "../controller/service.controller";
import { validate } from "../middleware/validateResource";
import { createServiceSchema, getServiceSchema, deleteServiceSchema, updateServiceSchema } from "../schema/service.schema";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.post(
  "/",
  [
     requireAdmin,
    upload.fields([
      { name: "bgImage", maxCount: 1 },
      { name: "normalImage", maxCount: 1 },
    ]),
    // validate(createServiceSchema),
  ],
  createServiceHandler
);


router.patch(
    "/:serviceId",
    [
      requireAdmin,
      upload.fields([
        { name: "bgImage", maxCount: 1 },
        { name: "normalImage", maxCount: 1 },
      ]),
      // validate(updateServiceSchema)
    ],
    updateServiceHandler
  );
  router.get("/:serviceId", [validate(getServiceSchema)], getServiceHandler);
  router.get("/", getAllServiceHandler);
  router.delete("/:serviceId", [ validate(deleteServiceSchema),requireAdmin], deleteServiceHandler);

export default router;
