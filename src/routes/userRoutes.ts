import express, { Express, Request, Response } from "express";
import UserController from "../controller/UserController";

const userRoutes: Express = express();
userRoutes.post("/signup", UserController.addUser);
userRoutes.post("/login", UserController.loginUser);
userRoutes.get("/getUser:id", UserController.getUserbyID);
userRoutes.get("/getLoggedin", UserController.getUserDetails);
export default userRoutes;
