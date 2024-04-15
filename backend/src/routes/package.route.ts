import express from "express";
import { createPackageHandler,getAllPackageHandler,getPackageHandler,updatePackageHandler,deletePackageHandler } from "../controller/package.controller";
import { validate } from "../middleware/validateResource";
import { createPackageSchema, getPackageSchema, deletePackageSchema, updatePackageSchema } from "../schema/package.schema";
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
  createPackageHandler
);


router.patch(
    "/:packageId",
    [
      requireAdmin,
      upload.fields([
        { name: "bgImage", maxCount: 1 },
        { name: "normalImage", maxCount: 1 },
      ]),
      // validate(updateServiceSchema)
    ],
    updatePackageHandler
  );
  
  router.get("/:packageId", [validate(getPackageSchema)], getPackageHandler);
  router.get("/", getAllPackageHandler);
  router.delete("/:packageId", [ validate(deletePackageSchema),requireAdmin], deletePackageHandler);

export default router;
