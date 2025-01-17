import Product from "../../product/domain/product.entity";
import ProductRepository from "../../product/domain/product.repository.interface";
import Order from "../domain/order.entity";
import OrderRepository from "../domain/order.repository.interface";

export class CreateOrderUseCase {

    private orderRepository: OrderRepository;
    private productRepository: ProductRepository;

    constructor(orderRepository: OrderRepository, productRepository: ProductRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public execute(customerId: number, listProductsId: number[]): Order | { error: string } {
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