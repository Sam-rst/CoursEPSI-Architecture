
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send("Hello world !");
});

import ProductController from "./product/product.controller"
app.use("/api/products", ProductController)

import OrderController from "./order/presentation/order.controller"
app.use("/api/orders", OrderController)

app.listen(PORT, () => {
    console.log("App started");
    console.log(`Lien du serveur (en local) : http://localhost:${PORT}`);
});
