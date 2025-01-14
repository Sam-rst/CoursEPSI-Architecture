import Product from "../../product/domain/product.entity";

type product = {
    id: number;
    price: number;
}
export type createOrderPayload = {
    customerId: number;
    products: product[];
}

export default class Order {
    private id: number;

    private createdAt: Date;

    private total: number;

    private customer: number;

    // private products: Product[];
    private products: [];

    private status: string;

    constructor(customerId: number, products: []) {
        if (!customerId) {
            throw new Error("customerId est nécessaire");
        }

        if (products.length == 0) {
            throw new Error("Vous devez avoir au moins un produit");
        }

        if (products.length > 2) {
            throw new Error("Vous ne pouvez qu'avoir au maximum 2 produits");
        }
        this.createdAt = new Date();
        this.customer = customerId;
        this.products = products;
        this.status = 'cart';

        this.total = products.reduce((acc, product) => {
            return acc + 5;
        }, 0);
    }

    getId(): number {
        return this.id
    }
}