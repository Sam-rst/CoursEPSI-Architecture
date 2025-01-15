import ProductRepository from "./infrastructure/product.repository";

export class ProductContainer {
    private static orderRepository: ProductRepository;

    public static getProductRepository(): ProductRepository {
        if (!ProductContainer.orderRepository) {
            ProductContainer.orderRepository = new ProductRepository();
        }

        return ProductContainer.orderRepository;
    }
}