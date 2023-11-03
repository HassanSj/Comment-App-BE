import express, { Express, Request, Response } from "express";
import FeedbackController from "../controller/FeedbackController";

const feedbackRoutes: Express = express();
feedbackRoutes.post("/addReview",FeedbackController.addFeedback);
feedbackRoutes.get("/getReview",FeedbackController.getUserReview);

export default feedbackRoutes;
