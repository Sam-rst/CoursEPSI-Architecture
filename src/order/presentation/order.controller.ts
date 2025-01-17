import express from "express";
import Order from "../domain/order.entity";
import { CreateOrderUseCase } from "../application/create-order.usecase";
import { PayOrderUseCase } from "../application/pay-order.usecase";
import { GetOrderUseCase } from "../application/get-order.usecase";
import { GetOrdersUseCase } from "../application/get-orders.usecase";
import { CancelOrderUseCase } from "../application/cancel-order.usecase";
import { OrderContainer } from "../order.container";
import { ProductContainer } from "../../product/product.container";


const router = express.Router();

router.get("", (request, response) => {

    const productRepository = OrderContainer.getOrderRepositoryInMemory();
    const getOrdersUseCase = new GetOrdersUseCase(productRepository);

    try {
        const orders = getOrdersUseCase.execute();
        response.status(201).json(orders);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.post("", (request, response) => {
    const customerId = request.body.customerId;
    const listProductsId = request.body.listProductsId;

    const productRepository = ProductContainer.getProductRepositoryInMemory();
    const orderRepository = OrderContainer.getOrderRepositoryInMemory();
    const createOrderUseCase = new CreateOrderUseCase(orderRepository, productRepository);

    try {
        const order = createOrderUseCase.execute(customerId, listProductsId);
        response.status(201).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message })
    }
});

router.get("/:orderId", (request, response) => {
    const orderId = parseInt(request.params.orderId);

    const orderRepository = OrderContainer.getOrderRepositoryInMemory();
    const getOrderUseCase = new GetOrderUseCase(orderRepository);

    try {
        const order = getOrderUseCase.execute(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.patch("/:orderId/pay", (request, response) => {
    const orderId = parseInt(request.params.orderId);

    const orderRepository = OrderContainer.getOrderRepositoryInMemory();
    const payOrderUseCase = new PayOrderUseCase(orderRepository);

    try {
        const order = payOrderUseCase.execute(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.patch("/:orderId/cancel", (request, response) => {
    const orderId = parseInt(request.params.orderId);

    const orderRepository = OrderContainer.getOrderRepositoryInMemory();
    const cancelOrderUseCase = new CancelOrderUseCase(orderRepository);

    try {
        const order = cancelOrderUseCase.execute(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

export default router;