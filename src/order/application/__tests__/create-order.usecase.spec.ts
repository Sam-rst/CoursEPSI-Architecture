import Product from "../../../product/domain/product.entity";
import ProductRepository from "../../../product/domain/product.repository.interface";
import Order from "../../domain/order.entity";
import OrderRepository from "../../domain/order.repository.interface";
import { CreateOrderUseCase } from "../create-order.usecase"

describe("En tant qu'utilisateur, je souhaite créer une commande", () => {
    it("Quand j'envoie un identifiant client et une liste d'ids de produits, alors une commande est créée", () => {
        const orderRepositoryFake = {
            create: (order: Order) => {
                return order;
            },
        } as unknown as OrderRepository;

        const productRepositoryFake = {
            findById: (productId: string) => {
                return {
                    id: 1,
                    title: "test",
                    price: 10,
                    getPrice: () => {
                        return 10
                    }
                }
            }
        } as unknown as ProductRepository;

        const createOrderUseCase = new CreateOrderUseCase(orderRepositoryFake, productRepositoryFake);

        expect(createOrderUseCase.execute(1, [1, 1]).getTotal()).toBe(20);

    })

    it("Quand j'envoie un identifiant client et une liste vide d'ids de produits, alors une commande est n'est pas créée et renvoie bien une erreur", () => {
        const orderRepositoryFake = {
            create: (order: Order) => {
                return order;
            },
        } as unknown as OrderRepository;

        const productRepositoryFake = {
            findById: (productId: string) => {
                return {
                    id: 1,
                    title: "test",
                    price: 10,
                    getPrice: () => {
                        return 10
                    }
                }
            }
        } as unknown as ProductRepository;

        const createOrderUseCase = new CreateOrderUseCase(orderRepositoryFake, productRepositoryFake);

        expect(() => createOrderUseCase.execute(1, [])).toThrow("Une commande demande au minimum 1 produit pour être acceptée.");

    })

    it("Quand j'envoie un identifiant client et une liste d'ids de produits supérieur à 2 produits, alors une commande est n'est pas créée et renvoie bien une erreur", () => {
        const orderRepositoryFake = {
            create: (order: Order) => {
                return order;
            },
        } as unknown as OrderRepository;

        const productRepositoryFake = {
            findById: (productId: string) => {
                return {
                    id: 1,
                    title: "test",
                    price: 10,
                    getPrice: () => {
                        return 10
                    }
                }
            }
        } as unknown as ProductRepository;

        const createOrderUseCase = new CreateOrderUseCase(orderRepositoryFake, productRepositoryFake);

        expect(() => createOrderUseCase.execute(1, [1, 1, 1])).toThrow("Une commande ne peut avoir que 2 produits au maximum.");

    })
})