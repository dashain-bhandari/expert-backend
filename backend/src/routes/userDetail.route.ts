import express from "express";
import { createUSerDetailHandler, deleteUSerDetailHandler, getUSerDetailHandler, getUserDetailByUserHandler, updateUSerDetailHandler } from "../controller/userDetail.controller";
import { validate } from "../middleware/validateResource";
import { createUserDetailSchema, deleteUserDetailSchema, getUserDetailByUserIdSchema, updateUserDetailSchema } from "../schema/userDetail.schema";
import upload from "../middleware/multer";

const router = express.Router();

router.post("/", [validate(createUserDetailSchema)], createUSerDetailHandler);
router.patch(
  "/:userDetailId",
  [
    upload.fields([
      { name: "profileImage", maxCount: 1 },
      { name: "backgroundImage", maxCount: 1 },
      { name: "organizationImage", maxCount: 1 },
    ]),
    validate(updateUserDetailSchema),
  ],
  updateUSerDetailHandler
);
router.get("/:userDetailId", [validate(updateUserDetailSchema)], getUSerDetailHandler);
router.delete("/:userDetailId", [validate(deleteUserDetailSchema)], deleteUSerDetailHandler);

router.get("/user/:userId", getUserDetailByUserHandler);

export default router;
