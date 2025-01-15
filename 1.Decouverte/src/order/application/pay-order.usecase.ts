import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";
import { OrderContainer } from "../order.container";

export class PayOrderUseCase {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = OrderContainer.getOrderRepository();
    }

    public payOrder(orderId: number): Order | { error: string } {
        const order = this.orderRepository.findById(orderId);

        if (!order) {
            throw new Error("Commande non trouvée");
        }

        try {
            order.pay();
            this.orderRepository.update(order);
            return order;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}