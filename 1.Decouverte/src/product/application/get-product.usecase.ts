import Product from "../domain/product.entity";
import ProductRepository from "../infrastructure/product.repository";

export class GetProductUseCase {

    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public execute(productId: number): Product | { error: string } {
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