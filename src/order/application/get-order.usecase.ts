import Order from "../domain/order.entity";
import OrderRepository from "../domain/order.repository.interface";

export class GetOrderUseCase {

    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public execute(orderId: number): Order | { error: string } {
        const order = this.orderRepository.findById(orderId);

        if (!order) {
            throw new Error("Commande non trouvée");
        }

        try {
            return order;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}