import OrderRepository from "./infrastructure/order.repository";

export class OrderContainer {
    private static orderRepository: OrderRepository;

    public static getOrderRepository(): OrderRepository {
        if (!OrderContainer.orderRepository) {
            OrderContainer.orderRepository = new OrderRepository();
        }

        return OrderContainer.orderRepository;
    }
}