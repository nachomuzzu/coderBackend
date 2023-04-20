const express = require("express");
const classCart = require("../classes/cartClass.js");
const CartClass = new classCart();
const classProducts = require("../classes/productClass.js");
const ProductsClass = new classProducts();
const router = express.Router();

router.post("/", (req, res) => {
  const cart = CartClass.create();
  cart.then((data) => res.status(200).json(data));
});

router.delete("/:id", (req, res) => {
  const updateCart = CartClass.delete(req.params.id);
  updateCart.then((data) => res.status(200).json(data));
});

router.get("/:id/productos", (req, res) => {
  const cart = CartClass.viewProducts(req.params.id);
  cart.then((data) => res.status(200).json(data));
});

router.post("/:id/productos", (req, res) => {
  const updateCart = ProductsClass.insertProductInCart(req.params.id, req.body);
  updateCart.then((data) => res.status(200).json(data));
});

router.delete("/:id/productos/:id_prod", (req, res) => {
  const updateCart = CartClass.deleteProductInCart(
    req.params.id,
    req.params.id_prod
  );
  updateCart.then((data) => res.status(200).json(data));
});

module.exports = router;
