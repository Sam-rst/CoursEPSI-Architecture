import express from "express";
import Order from "../domain/order.entity";
import { CreateOrderUseCase } from "../application/create-order.usecase";
import { PayOrderUseCase } from "../application/pay-order.usecase";
import { GetOrderUseCase } from "../application/get-order.usecase";
import { GetAllOrdersUseCase } from "../application/get-all-orders.usecase";
import { CancelOrderUseCase } from "../application/cancel-order.usecase";


const router = express.Router();

router.get("", (request, response) => {

    const getAllOrdersUseCase = new GetAllOrdersUseCase();

    try {
        const orders = getAllOrdersUseCase.getAllOrders();
        response.status(201).json(orders);
    } catch (error: any) {
        response.status(400).json({ error: error.message })
    }
})

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


router.get("/:orderId", (request, response) => {
    const orderId = parseInt(request.params.orderId);

    const getOrderUseCase = new GetOrderUseCase();

    try {
        const order = getOrderUseCase.getOrder(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
})

router.patch("/:orderId/pay", (request, response) => {
    const orderId = parseInt(request.params.orderId);

    const payOrderUseCase = new PayOrderUseCase();

    try {
        const order = payOrderUseCase.payOrder(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
})

router.patch("/:orderId/cancel", (request, response) => {
    const orderId = parseInt(request.params.orderId);

    const cancelOrderUseCase = new CancelOrderUseCase();

    try {
        const order = cancelOrderUseCase.cancelOrder(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
})

export default router;