
import express from "express";
const app = express();
const PORT = 3010;


app.get('/', (request, response) => {
    response.send("Hello world !");
});

import ProductController from "./product/product.controller"
app.use("/api/product", ProductController)

import OrderController from "./order/order.controller"
app.use("/api/order", OrderController)

app.listen(PORT, () => {
    console.log("App started");
    console.log(`Lien du serveur (en local) : http://localhost:${PORT}`);
});
