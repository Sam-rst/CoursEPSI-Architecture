import Product from "../domain/product.entity";
import ProductRepository from "../infrastructure/product.repository";
import { ProductContainer } from "../product.container";

export class GetAllProductsUseCase {

    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = ProductContainer.getProductRepository();
    }

    public getAllProducts(): Product[] | { error: string } {
        const products = this.productRepository.findAll();

        try {
            return products;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}