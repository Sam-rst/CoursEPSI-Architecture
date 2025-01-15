import Product from "../domain/product.entity";
import ProductRepository from "../infrastructure/product.repository";
import { ProductContainer } from "../product.container";

export class GetProductUseCase {

    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = ProductContainer.getProductRepository();
    }

    public getProduct(productId: number): Product | { error: string } {
        const product = this.productRepository.findById(productId);

        if (!product) {
            throw new Error("Produit non trouvée");
        }

        try {
            return product;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}