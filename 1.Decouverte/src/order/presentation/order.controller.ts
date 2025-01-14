import express from "express";
import Order from "../domain/order.entity";
import { CreateOrderUseCase } from "../application/create-order.usecase";


const router = express.Router();

router.get("", (request, response) => {
    response.send("Liste des commandes !");
});

router.post("", (request, response) => {
    const customerId = request.body.customerId;
    const products = request.body.products;

    const createOrderUseCase = new CreateOrderUseCase();

    try {
        const order = createOrderUseCase.createOrder(customerId, products);
        response.status(201).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message })
    }
})

export default router;