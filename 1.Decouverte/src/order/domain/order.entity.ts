import Product from "../../product/domain/product.entity";

const enum STATUS {
    CREATED = "CREATED",
    PAID = "PAID",
    CANCELED = "CANCELED",
}

export default class Order {
    private id: number;

    private total: number;

    private customer: number;

    private products: Product[];

    private status: STATUS;

    private createdAt: Date;

    private paidAt: Date;

    private canceledAt: Date;

    constructor(customerId: number, products: Product[]) {
        if (!customerId || !products) {
            throw new Error("Les paramètres ne sont pas valides pour créer une commande.");
        }

        if (products.length == 0) {
            throw new Error("Une commande demande au minimum 1 produit pour être acceptée.");
        }

        if (products.length > 2) {
            throw new Error("Une commande ne peut avoir que 2 produits au maximum.");
        }
        this.createdAt = new Date();
        this.customer = customerId;
        this.products = products;
        this.status = STATUS.CREATED;

        this.total = products.reduce((acc, product) => {
            return acc + product.getPrice();
        }, 0);
    }

    public getId(): number {
        return this.id
    }

    public setId(id: number): void {
        this.id = id
    }

    public pay(): void {
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

    public cancel(): void {
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