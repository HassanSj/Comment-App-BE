import express, { Express, Request, Response } from "express";


import userRoutes from "./userRoutes";
import feedbackRoutes from "./feedbackRoutes";

const mainRoute: Express = express();
mainRoute.use("/api/feedback", feedbackRoutes);
mainRoute.use("/api/user", userRoutes);

export default mainRoute;
