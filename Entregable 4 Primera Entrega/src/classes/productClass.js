const fs = require("fs");
const classCart = require("./cartClass.js");
const CartClass = new classCart();
module.exports = class Products {
  _UBICATION = "./data/products.json";

  async create(product) {
    try {
      if (
        product.name &&
        product.description &&
        product.photo &&
        product.price &&
        product.stock &&
        !product.id &&
        !product.timestamp
      ) {
        const products = await fs.promises.readFile(this._UBICATION, "utf-8");
        let productsClean = JSON.parse(products);
        product = {
          id: productsClean.length + 1,
          timestamp: Date.now(),
          ...product,
        };
        productsClean.push(product);
        await fs.promises.writeFile(
          this._UBICATION,
          JSON.stringify(productsClean, null, 2)
        );
        return {
          message: "Producto agregado con exito",
          product: product,
        };
      } else {
        return {
          error: 0,
          description: "El producto ingresado no es correcto",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, updateProduct) {
    try {
      const products = await fs.promises.readFile(this._UBICATION, "utf-8");
      let productsClean = JSON.parse(products);
      if (
        updateProduct.name &&
        updateProduct.description &&
        updateProduct.photo &&
        updateProduct.price &&
        updateProduct.stock &&
        !updateProduct.id &&
        !updateProduct.timestamp
      ) {
        const updateProducts = productsClean.map((product) => {
          if (product.id === id) {
            updateProduct = {
              id: product.id,
              timestamp: Date.now(),
              ...updateProduct,
            };
            return updateProduct;
          } else {
            return product;
          }
        });
        await fs.promises.writeFile(
          this._UBICATION,
          JSON.stringify(updateProducts, null, 2)
        );
        return {
          message: "Producto actualizado con exito",
          products: updateProduct,
        };
      } else {
        return { error: 0, description: "Producto no encontrado" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    const products = await fs.promises.readFile(this._UBICATION, "utf-8");
    let productsClean = JSON.parse(products);
    const findProduct = productsClean.find((product) => product.id === id);
    if (findProduct) {
      const updateProducts = productsClean.filter(
        (product) => product.id != id
      );
      await fs.promises.writeFile(
        this._UBICATION,
        JSON.stringify(updateProducts, null, 2)
      );
      return {
        message: "Producto eliminado con exito",
        id: id,
        products: updateProducts,
      };
    } else {
      return { error: 0, description: "Producto no encontrado" };
    }
  }
  async find(id) {
    const products = await fs.promises.readFile(this._UBICATION, "utf-8");
    let productsClean = JSON.parse(products);
    const findProduct = productsClean.find((product) => product.id == id);
    if (findProduct) {
      return { message: "Producto encontrado con exito", product: findProduct };
    } else {
      return { error: 0, description: "Producto no encontrado" };
    }
  }

  async insertProductInCart(idCart, idProduct) {
    const products = await fs.promises.readFile(this._UBICATION, "utf-8");
    let productsClean = JSON.parse(products);
    const product = productsClean.find((product) => product.id == idProduct.id);

    const result = CartClass.insertProduct(idCart, product);
    return result;
  }
};
