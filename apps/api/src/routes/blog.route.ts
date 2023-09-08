import { Router } from "express";
import {
  userSignUpController,
  userSignInController,
} from "../controllers/auth.controller";
import validator from "../middlewares/validators";
import expressAsyncHandler from "express-async-handler";

const blogRoute = Router();

blogRoute.get("/", validator.userSignUp, userSignUpController);

blogRoute.post("/", validator.userLogin, userSignInController);
blogRoute.put("/", validator.userLogin, userSignInController);
blogRoute.delete("/", validator.userLogin, userSignInController);

export default blogRoute;
