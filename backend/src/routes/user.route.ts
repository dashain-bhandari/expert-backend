import express from "express";
import {
  authenticateToken,
  createUserHandler,
  deleteUserHandler,
  forgotPwHandler,
  generatePasswordHandler,
  getAllUserHandler,
  getOnlyUsers,
  getOnlyUsersAndAdmin,
  getUserByUsernameHandler,
  getUserFromTokenHandler,
  getUserHandler,
  googleLogInHandler,
  loginUserHandler,
  logOutHandler,
  registerSuperAdminHandler,
  updateAdminPasswordHandler,
  updatePasswordHandler,
  updateProfileHandler,
  updateUserHandler,
  verifyEmailHander,
} from "../controller/user.controller";
import {
  createUserSchema,
  getUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../schema/user.schema";
import { validate } from "../middleware/validateResource";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";
import upload from "../middleware/multer";
import { authVerify } from "../middleware/authVerify";
import { requireAdmin } from "../middleware/requireAdmin";


const router = express.Router();

router.get("/user-from-token/", [authVerify], getUserFromTokenHandler);
router.get("/get-user-from-token/", [authVerify], getUserFromTokenHandler);

router.get("/logout", logOutHandler);
router.get("/check-cookie", (req, res) => {
  if (req.headers.cookie && req.headers.cookie.includes("accessToken")) {
    // Cookie exists
    console.log("cookie exists");
    res.status(200).send("Cookie exists");
  } else {
    // Cookie doesn't exist
    res.status(404).send("Cookie doesn't  exist");
  }
});

router.post("/register", [validate(createUserSchema)], createUserHandler);
router.post(
  "/register/admin",
  [validate(createUserSchema)],
  registerSuperAdminHandler
);
router.post("/google/login", googleLogInHandler);
router.post("/login", [validate(loginUserSchema)], loginUserHandler);
router.post("/forgot-pw", forgotPwHandler);
router.patch("/password-update", generatePasswordHandler);
router.patch("/changePw", authVerify, updatePasswordHandler);
router.patch(
  "/updateProfilePic",
  [
    authVerify,
    upload.fields([
      { name: "profile", maxCount: 1 },
      
    ]),
  ],
  updateProfileHandler
);
router.patch("/changeAdminPw", authVerify, updateAdminPasswordHandler);
router.patch("/:userId", updateUserHandler);
router.get("/all/admin", getOnlyUsersAndAdmin);
router.get("/all", getOnlyUsers);
router.get("/:userId", validate(getUserSchema), getUserHandler);
router.get("/", getAllUserHandler);

router.delete("/:userId", requireSuperAdmin, deleteUserHandler);

router.get("/verify-email/:token", verifyEmailHander);

router.get("/username/:username", getUserByUsernameHandler);

export default router;
