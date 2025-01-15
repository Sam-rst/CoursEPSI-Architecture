import Product from "../domain/product.entity";

export default class ProductRepository {
    private products: Product[] = [];

    create(product: Product): Product {
        product.setId(this.products.length + 1);
        this.products.push(product);

        return product;
    }

    findAll(): Product[] {
        return this.products;
    }

    findById(id: number): Product | undefined {
        return this.products.find((product) => product.getId() === id);

    }

    update(product: Product) {
        this.products = this.products.map((productInList) => {
            if (productInList.getId() === product.getId()) {
                return product;
            }

            return productInList;
        })
    }
}