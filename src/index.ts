
import express from "express";
import bodyParser from "body-parser";

// Controllers
import ProductController from "./product/presentation/product.controller"
import OrderController from "./order/presentation/order.controller"

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

app.get("/", (request, response) => {
    response.send("Hello world !");
});

app.use("/api/products", ProductController)

app.use("/api/orders", OrderController)

app.listen(PORT, () => {
    console.log("App started");
    console.log(`Lien du serveur (en local) : http://localhost:${PORT}`);
});
