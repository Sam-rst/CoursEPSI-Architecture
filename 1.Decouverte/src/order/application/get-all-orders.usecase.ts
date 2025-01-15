import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";
import { OrderContainer } from "../order.container";

export class GetAllOrdersUseCase {

    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = OrderContainer.getOrderRepository();
    }

    public getAllOrders(): Order[] | { error: string } {
        const orders = this.orderRepository.findAll();

        try {
            return orders;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}