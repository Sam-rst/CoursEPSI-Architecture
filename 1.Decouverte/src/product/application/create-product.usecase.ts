import Product from "../../product/domain/product.entity";
import ProductRepository from "../infrastructure/product.repository";

export class CreateProductUseCase {

    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public execute(title: string, price: number): Product | { error: string } {
        const productCreated = new Product(title, price);

        try {
            const productPersisted = this.productRepository.create(productCreated);
            return productPersisted;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}