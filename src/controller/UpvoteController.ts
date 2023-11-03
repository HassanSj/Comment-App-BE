// upvoteController.ts
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Upvote from "../models/Upvote";

// Create an upvote
export default {
  createUpvote: async (req: Request, res: Response) => {
    const { userId, feedbackId } = req.body;

    try {
      const upvoteRepository = getRepository(Upvote);

      // Check if the user has already upvoted the feedback
      const existingUpvote = await upvoteRepository.findOne({
        where: { user: userId, feedback: feedbackId },
      });

      if (existingUpvote) {
        return res
          .status(400)
          .json({ message: "User has already upvoted this feedback" });
      }

      const upvote = new Upvote();
      upvote.user = userId;
      upvote.feedback = feedbackId;

      await upvoteRepository.save(upvote);

      return res.status(201).json({ message: "Upvote added successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating upvote" });
    }
  },
  removeUpvote: async (req: Request, res: Response) => {
    const upvoteId: any = req.params.upvoteId;

    try {
      const upvoteRepository = getRepository(Upvote);
      const upvote = await upvoteRepository.findOne(upvoteId);

      if (!upvote) {
        return res.status(404).json({ message: "Upvote not found" });
      }

      await upvoteRepository.remove(upvote);

      return res.status(200).json({ message: "Upvote removed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error removing upvote" });
    }
  },
};
