import expres from "express"
import {loginUser, registerUser,getUsers, deleteUser,addUser,updateUser } from "../controllers/User.controller.js"
import userMiddleware from "../middlewares/user.middleware.js"



const userRouter = expres.Router()

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);

// Protected Routes
userRouter.get("/users", userMiddleware, getUsers);
userRouter.delete("/delete/:id", userMiddleware, deleteUser);
userRouter.post("/add", userMiddleware, addUser);
userRouter.put("/update/:id",userMiddleware, updateUser);



export default userRouter;