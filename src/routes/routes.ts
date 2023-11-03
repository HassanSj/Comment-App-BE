import express, { Express, Request, Response } from "express";


import userRoutes from "./userRoutes";
import feedbackRoutes from "./feedbackRoutes";
import productRoutes from "./productRoutes";
import upvoteRoutes from "./upvoteRoutes";


const mainRoute: Express = express();
mainRoute.use("/api/feedback", feedbackRoutes);
mainRoute.use("/api/user", userRoutes);
mainRoute.use("/api/products",productRoutes);
mainRoute.use("/api/upvote",upvoteRoutes);
export default mainRoute;
