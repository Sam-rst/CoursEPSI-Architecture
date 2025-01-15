export default class Product {
    private id: number;

    private title: string;

    private price: number;

    private createdAt: Date;

    constructor(title: string, price: number) {
        if (!title) {
            throw new Error("title est nécessaire");
        }

        if (price < 0) {
            throw new Error("price est négatif");
        }

        this.createdAt = new Date();
        this.title = title;
        this.price = price;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }
}