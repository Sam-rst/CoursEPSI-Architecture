import express from "express";
import Order from "./domain/order.entity";


const router = express.Router();

router.get("", (request, response) => {
    response.send("Liste des commandes !");
});

router.post("", (request, response) => {
    const orderCreated = new Order(
        request.body.customerId,
        request.body.products
    )

    response.status(201).json(orderCreated);
})

export default router;