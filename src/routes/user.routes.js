import {Router } from "express"
import { deleteById, loginUser, registerUser, updateUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.get("/login",loginUser)
userRouter.put("/update/:id",updateUser)
userRouter.delete("/delete/:id",deleteById);

export default userRouter;   