import Product from "../../product/domain/product.entity";
import ProductRepository from "../../product/infrastructure/product.repository";
import { ProductContainer } from "../../product/product.container";
import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";
import { OrderContainer } from "../order.container";

export class CreateOrderUseCase {

    private orderRepository: OrderRepository;
    private productRepository: ProductRepository;

    constructor() {
        this.orderRepository = OrderContainer.getOrderRepository();
        this.productRepository = ProductContainer.getProductRepository();
    }

    public createOrder(customerId: number, listProductsId: number[]): Order | { error: string } {
        const products: Product[] = listProductsId.map(productId =>
            this.productRepository.findById(productId)
        );

        if (products.includes(undefined)) {
            return { error: "Un ou plusieurs produits n'existent pas" };
        }

        const orderCreated = new Order(customerId, products);

        try {
            const orderPersisted = this.orderRepository.create(orderCreated);
            return orderPersisted;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}