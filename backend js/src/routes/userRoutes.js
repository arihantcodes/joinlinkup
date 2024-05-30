import { Router } from "express";

import { upload } from "../middleware/multer.js";

import { verifyJWT } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  Logout,
  RefreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  UpdateUserDetails,
  UpdateUserAvatar,
} from "../controllers/authController.js";

const router = Router();

router.route("/signup").post(registerUser);

router.route("/signin").post(loginUser);
router.route("/logout").post(verifyJWT, Logout);
router.route("/refreshtoken").post(RefreshAccessToken);
router.route("/forgotpassword").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/onboarding").patch(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  UpdateUserDetails
);
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), UpdateUserAvatar);

export default router;
