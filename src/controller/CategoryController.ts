import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../models/Feedback";

export default {
  // addCategory: async (req: Request, res: Response) => {
  //   try {
  //     const { name } = req.body;
  //     console.log("Received data from client:", req.body);

  //     if (!name) {
  //       return res
  //         .status(400)
  //         .json({ message: "Name is required for the category." });
  //     }
  //     const categoryRepository = getRepository(Category);
  //     const newCategory = new Category();
  //     newCategory.name = name;
  //     const savedCategory = await categoryRepository.save(newCategory);
  //     return res
  //       .status(201)
  //       .json({ message: "Category added", category: savedCategory });
  //   } catch (error: any) {
  //     console.error("Error getting response:", error);
  //     return res
  //       .status(500)
  //       .json({ message: "An error occurred", error: error.message });
  //   }
  // },
  // getAll: async (req: Request, res: Response) => {
  //   const itemRepository = getRepository(Category);

  //   try {
  //     const categories = await itemRepository.find({
  //       relations: ["products"],
  //     });

  //     const categoryList = categories.map((category) => ({
  //       id: category.id,
  //       name: category.name,
  //       productCount: category.products.length,
  //     }));

  //     res.status(200).json({ categories: categoryList });
  //   } catch (error: any) {
  //     console.error("Error getting response:", error);
  //     res
  //       .status(500)
  //       .json({ message: "An error occurred", error: error.message });
  //   }
  // },
  // updateCategory: async (req: Request, res: Response) => {
  //   const itemId: any = req.params.id;
  //   const { name } = req.body;
  //   console.log("Received data from client:", req.body);

  //   const itemRepository = getRepository(Category);

  //   try {
  //     const inventoryItem = await itemRepository.findOne({
  //       where: { id: itemId },
  //     });

  //     if (!inventoryItem) {
  //       return res.status(404).send("Category not found");
  //     }
  //     inventoryItem.name = name;
  //     await itemRepository.save(inventoryItem);

  //     return res.status(200).json(inventoryItem);
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send("Error updating Category");
  //   }
  // },
  // deleteCategory: async (req: Request, res: Response) => {
  //   const itemId: any = req.params.id;

  //   const itemRepository = getRepository(Category);

  //   try {
  //     const inventoryItem = await itemRepository.findOne({
  //       where: { id: itemId },
  //     });

  //     if (!inventoryItem) {
  //       return res.status(404).send("Category not found");
  //     }

  //     await itemRepository.remove(inventoryItem);

  //     return res.status(204).send();
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send("Error deleting Category");
  //   }
  // },
};
