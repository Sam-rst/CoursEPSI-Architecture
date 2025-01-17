import express from "express";
import { CreateProductUseCase } from "../application/create-product.usecase";
import { GetAllProductsUseCase } from "../application/get-all-products.usecase";
import { GetProductUseCase } from "../application/get-product.usecase";
import { ProductContainer } from "../product.container";


const router = express.Router();

router.get("", (request, response) => {
    const productRepository = ProductContainer.getProductRepositoryInMemory();
    const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);

    try {
        const products = getAllProductsUseCase.execute();
        response.status(201).json(products);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.post("", (request, response) => {
    const title = request.body.title;
    const price = request.body.price;

    const productRepository = ProductContainer.getProductRepositoryInMemory();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    try {
        const product = createProductUseCase.execute(title, price);
        response.status(201).json(product);
    } catch (error: any) {
        response.status(400).json({ error: error.message })
    }
})

router.get("/:productId", (request, response) => {
    const productId = parseInt(request.params.productId);

    const productRepository = ProductContainer.getProductRepositoryInMemory();
    const getProductUseCase = new GetProductUseCase(productRepository);

    try {
        const product = getProductUseCase.execute(productId);
        response.status(200).json(product);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

export default router;