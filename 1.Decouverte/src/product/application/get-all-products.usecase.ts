import Product from "../domain/product.entity";
import ProductRepository from "../infrastructure/product.repository";

export class GetAllProductsUseCase {

    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public execute(): Product[] | { error: string } {
        const products = this.productRepository.findAll();

        try {
            return products;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}