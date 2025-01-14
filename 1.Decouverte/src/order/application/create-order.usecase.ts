import Product from "../../product/domain/product.entity";
import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";

export class CreateOrderUseCase {
    createOrder(customerId: number, products: []): Order | { error: string } {
        const orderCreated = new Order(customerId, products);

        const orderRepository = new OrderRepository();

        try {
            const orderPersisted = orderRepository.create(orderCreated);
            return orderPersisted;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}