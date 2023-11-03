import express, { Express, Request, Response } from "express";
import ProductController from "../controller/ProductController";


const productRoutes: Express = express();
productRoutes.get("/get",ProductController.getAllProducts)
productRoutes.get("/product/:id",ProductController.getUserByID)
export default productRoutes;
