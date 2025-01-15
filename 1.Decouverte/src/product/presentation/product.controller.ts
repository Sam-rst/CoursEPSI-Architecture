import express from "express";
import { CreateProductUseCase } from "../application/create-product.usecase";
import { GetAllProductsUseCase } from "../application/get-all-products.usecase";


const router = express.Router();

router.get("", (request, response) => {
    const getAllProductsUseCase = new GetAllProductsUseCase();

    try {
        const products = getAllProductsUseCase.getAllProducts();
        response.status(201).json(products);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.post("", (request, response) => {
    const title = request.body.title;
    const price = request.body.price;

    const createProductUseCase = new CreateProductUseCase();

    try {
        const product = createProductUseCase.createProduct(title, price);
        response.status(201).json(product);
    } catch (error: any) {
        response.status(400).json({ error: error.message })
    }
})

export default router;