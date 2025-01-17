import Order from "./order.entity";

export default interface OrderRepository {
    create(order: Order): Order;
    findById(orderId: number): Order;
    findAll(): Order[];
    update(order: Order): Order;
}