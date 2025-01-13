export default class Order {
    private id: string;

    private createdAt: Date;

    private total: number;

    private customer: string;

    private products: [];

    private status: string;

    constructor(customerId, products) {
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
            return acc + product.price;
        }, 0);
    }
}