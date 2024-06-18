import express from "express";
import validateRequest from "../../middelwares/validRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../middelwares/auth";
import { USER_ROLE } from "../user/user.constrant";

const router = express.Router();

router.post("/login",
    // auth(),
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
)

router.post("/change-password",
    auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword
)

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
  );

router.post(
    '/forget-password',
    validateRequest(AuthValidation.forgetPasswordValidationSchema),
    AuthControllers.forgetPassword
)

export const AuthRouter = router;