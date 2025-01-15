import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";
import { OrderContainer } from "../order.container";

export class CancelOrderUseCase {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = OrderContainer.getOrderRepository();
    }

    public cancelOrder(orderId: number): Order | { error: string } {
        const order = this.orderRepository.findById(orderId);

        if (!order) {
            throw new Error("Commande non trouvée");
        }

        try {
            order.cancel();
            this.orderRepository.update(order);
            return order;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}