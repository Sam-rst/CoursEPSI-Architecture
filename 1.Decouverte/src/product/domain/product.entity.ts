export default class Product {
    private id: string;

    private title: string;

    private price: number;

    constructor(title: string, price: number) {
        if (!title) {
            throw new Error("title est nécessaire");
        }

        if (price < 0) {
            throw new Error("price est négatif");
        }

        this.title = title;
        this.price = price;
    }

    public get Title(): string {
        return this.title;
    }

    public set Title(value: string) {
        if (!value) {
            throw new Error("title est nécessaire");
        }
        this.title = value;
    }

    public get Price(): number {
        return this.price;
    }

    public set Price(value: number) {
        if (value < 0) {
            throw new Error("price est négatif");
        }
        this.price = value;
    }
}