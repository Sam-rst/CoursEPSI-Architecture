import Product from "../../product/domain/product.entity";

const enum STATUS {
    CREATED = "CREATED",
    PAID = "PAID",
    CANCELED = "CANCELED",
}

export default class Order {
    private id: number;

    private createdAt: Date;

    private total: number;

    private customer: number;

    // private products: Product[];
    private products: [];

    private status: STATUS;

    private paidAt: Date;

    private canceledAt: Date;

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
        this.status = STATUS.CREATED;

        this.total = products.reduce((acc, product) => {
            return acc + 5;
        }, 0);
    }

    getId(): number {
        return this.id
    }

    setId(id: number): void {
        this.id = id
    }

    pay(): void {
        if (this.products.length === 0) {
            throw new Error("Vous ne pouvez pas payer une commande sans produits dedans.")
        }

        if (this.status === STATUS.PAID) {
            throw new Error("Commande déjà passée.")
        }

        if (this.status === STATUS.CANCELED) {
            throw new Error("Vous ne pouvez pas payer une commande annulée.")
        }

        try {
            this.status = STATUS.PAID;
            this.paidAt = new Date();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    cancel(): void {
        if (this.status === STATUS.CANCELED) {
            throw new Error("Vous ne pouvez pas annuler une commande déjà annulée.")
        }

        try {
            if (this.status === STATUS.PAID) {
                this.status = STATUS.CANCELED;
                this.canceledAt = new Date();
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}