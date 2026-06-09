import expres from "express"
import {loginUser, registerUser,getUsers, deleteUser } from "../controllers/User.controller.js"


const userRouter = expres.Router()

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/users", getUsers);
userRouter.delete("/delete/:id", deleteUser);



export default userRouter;