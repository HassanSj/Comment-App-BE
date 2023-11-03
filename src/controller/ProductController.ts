import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import RequestResponseMappings from "../utils/RequestResponseMappings";
import Products from "../models/Products";
import Feedback from "../models/Feedback";

export default {
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const productRepository = getRepository(Products);
      const products = await productRepository.find();
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error getting products:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  // getUserByID: async (req: Request, res: Response) => {
  //   const productId : any = req.query.id;
  
  //   try {
  //     const product = await getRepository(Products).findOne(productId);
  
  //     if (!product) {
  //       return res.status(404).send('Product not found');
  //     }
  //     const userEntity = await userRepository.findOne({
  //       where: { id: userId },
  //     });
  //     const product = await getRepository(Products).findOne({
  //       where: { id: productId },
  //       relations: ['feedback'], // Assuming 'feedback' is the name of the relationship in your entity model
  //     });
  //     const feedback = await getRepository(Feedback).find({
  //       where: { product: product },
  //     });
  //     return res.send({ product, feedback });
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  getUserByID: async (req: Request, res: Response) => {
  const productId : any = req.params.id;
  
    try {
      // Fetch the product with associated feedback
      const product = await getRepository(Products).findOne({
        where: { id: productId },
        relations: ['feedbacks', 'feedbacks.user'], // Assuming 'feedback' is the name of the relationship in your entity model
      });
      console.log("PRODUCT",product)
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Access the associated feedback through the 'feedback' property
      const feedback = product.feedbacks;
  
      // You can return both the product and its associated feedback in the response
      return res.send({ product });
    } catch (error : any) {
      return res.status(500).send(error.message);
    }
  },
};
