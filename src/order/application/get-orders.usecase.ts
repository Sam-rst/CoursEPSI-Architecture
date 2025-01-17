import Order from "../domain/order.entity";
import OrderRepository from "../domain/order.repository.interface";

export class GetOrdersUseCase {

    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public execute(): Order[] | { error: string } {
        const orders = this.orderRepository.findAll();

        try {
            return orders;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}