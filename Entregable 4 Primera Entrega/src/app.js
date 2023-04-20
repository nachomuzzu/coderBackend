const __PORT = 8080;
const express = require("express");
const products = require("./routes/productRoutes.js");
const cart = require("./routes/cartRoutes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", products);
app.use("/api/carrito", cart);

app.listen(__PORT, () => console.log("Server Up"));
