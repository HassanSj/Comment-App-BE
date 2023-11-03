import express, { Express, Request, Response } from "express";
import FeedbackController from "../controller/FeedbackController";
import UpvoteController from "../controller/UpvoteController";

const upvoteRoutes: Express = express();
upvoteRoutes.post("/addUpvote",UpvoteController.createUpvote);
upvoteRoutes.get("/removeUpvote/:upvoteId",UpvoteController.removeUpvote);

export default upvoteRoutes;
