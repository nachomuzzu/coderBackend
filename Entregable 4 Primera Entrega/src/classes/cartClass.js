const fs = require("fs");
module.exports = class Cart {
  _UBICATION = "./data/cart.json";

  async create() {
    const cart = await fs.promises.readFile(this._UBICATION, "utf-8");
    let cartClean = JSON.parse(cart);
    const newCart = {
      id: cartClean.length + 1,
      timestamp: Date.now(),
      products: [],
    };
    cartClean = [...cartClean, newCart];
    await fs.promises.writeFile(
      this._UBICATION,
      JSON.stringify(cartClean, null, 2)
    );
    return { message: "Carrito Creado con Exito", cart: newCart };
  }

  async delete(id) {
    const cart = await fs.promises.readFile(this._UBICATION, "utf-8");
    let cartClean = JSON.parse(cart);
    const findCart = cartClean.find((cart) => cart.id == id);
    if (findCart) {
      const newCarts = cartClean.filter((cart) => cart.id != id);
      await fs.promises.writeFile(
        this._UBICATION,
        JSON.stringify(newCarts, null, 2)
      );
      return { message: "Carrito eliminado con exito", cart: findCart };
    } else {
      return { error: 0, description: "Carrito no encontrado" };
    }
  }

  async viewProducts(id) {
    const cart = await fs.promises.readFile(this._UBICATION, "utf-8");
    let cartClean = JSON.parse(cart);
    const findCart = cartClean.find((cart) => cart.id == id);
    if (findCart) {
      return {
        message: "Carrito encontrado con exito",
        cart: findCart.products,
      };
    } else {
      return { error: 0, description: "Carrito no encontrado" };
    }
  }
  async insertProduct(idCart, product) {
    const cart = await fs.promises.readFile(this._UBICATION, "utf-8");
    let cartClean = JSON.parse(cart);
    const findCart = cartClean.find((cart) => cart.id == idCart);
    if (findCart && product) {
      const updateCarts = cartClean.map((cart) => {
        if (cart.id == idCart) {
          cart.products = [...cart.products, product];
        }
        return cart;
      });
      await fs.promises.writeFile(
        this._UBICATION,
        JSON.stringify(updateCarts, null, 2)
      );
      return {
        message: "Producto agregado a carrito exitosamente",
        id: idCart,
        product: product,
      };
    } else if (findCart && !product) {
      return { error: 0, description: "Producto no encontrado" };
    } else if (!findCart && product) {
      return { error: 0, description: "Carrito no encontrado" };
    } else {
      return { error: 0, description: "Carrito y Producto no encontrado" };
    }
  }

  async deleteProductInCart(idCart, idProduct) {
    const cart = await fs.promises.readFile(this._UBICATION, "utf-8");
    let cartClean = JSON.parse(cart);
    const findCart = cartClean.find((cart) => cart.id == idCart);
    const findProduct = findCart.products.find(
      (product) => product.id == idProduct
    );
    if (findCart && findProduct) {
      const updateCarts = cartClean.map((cart) => {
        if (cart.id == idCart) {
          cart.products = cart.products.filter(
            (product) => product.id != idProduct
          );
        }
        return cart;
      });
      await fs.promises.writeFile(
        this._UBICATION,
        JSON.stringify(updateCarts, null, 2)
      );
      return {
        message: "Producto eliminado del carrito exitosamente",
        idCart: idCart,
        idProduct: idProduct,
      };
    } else if (findCart && !findProduct) {
      return { error: 0, description: "Producto no encontrado" };
    } else if (!findCart && findProduct) {
      return { error: 0, description: "Carrito no encontrado" };
    } else {
      return { error: 0, description: "Carrito y Producto no encontrado" };
    }
  }
};
