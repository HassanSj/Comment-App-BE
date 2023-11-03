import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Feedback from "../models/Feedback";
import User from "../models/User";
import Products from "../models/Products";

export default {
  addFeedback: async (req: Request, res: Response) => {
    const { description, userId, productId } = req.body;

    try {
      const feedbackRepository = getRepository(Feedback);
      const feedback = new Feedback();
      feedback.description = description;

      const userRepository = getRepository(User);
      const productRepository = getRepository(Products);

      // Find the user and product based on their IDs
      const user = await userRepository.findOne({ where: { id: userId } });
      const product = await productRepository.findOne({
        where: { id: productId },
      });

      if (!user || !product) {
        return res.status(400).json({ message: "User or Product not found" });
      }

      feedback.user = user;
      feedback.product = product;

      await feedbackRepository.save(feedback);

      return res.status(201).json({ message: "Review added successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUserReview : async (req: Request, res: Response) => {
    const productId = parseInt(req.query.productId as string);
    const userId = parseInt(req.query.userId as string);
  
    try {
      const feedbackRepository = getRepository(Feedback);
      const userReview = await feedbackRepository
      .createQueryBuilder('feedback')
      .leftJoin('feedback.product', 'product')
      .leftJoin('feedback.user', 'user')
      .where('product.id = :productId', { productId })
      .andWhere('user.id = :userId', { userId })
      .getOne();
  
      if (userReview) {
        return res.status(200).json(userReview);
      } else {
        return res.status(404).json({ message: 'User review not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching user review' });
    }
  }, 
};

