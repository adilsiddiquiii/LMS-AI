import express from "express";
import {
  googleSignUp,
  logIn,
  logOut,
  resetPassword,
  sendOtp,
  signUp,
  verifyOtp,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.get("/logout", logOut);

authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetPassword);

authRouter.post("/googleauth", googleSignUp);

export default authRouter;
