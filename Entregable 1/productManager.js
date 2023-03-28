class ProductManager {
    constructor() {
      this.products = [];
    }
  
    agregarProducto(title, description, price, thumbnail, code, stock) {
      const producto = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      if (
        title === undefined ||
        description === undefined ||
        price === undefined ||
        thumbnail === undefined ||
        code === undefined ||
        stock === undefined
      ) {
        return console.log("Todos los campos son obligatorios");
      }
  
      let condition = this.products.find((producto) => producto.code === code);
      if (condition) {
        return console.log("Este producto ya existe");
      } else {
        this.products.push(producto);
      }
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      let myID = parseInt(id);
      let miProducto = null;
      this.products.forEach((producto) => {
        if (producto.id === myID) {
          miProducto = producto;
        }
      });
      if (miProducto === null) {
        return console.log("No existe el producto");
      } else {
        return miProducto;
      }
    }
  }
  
  const productManager = new ProductManager();
  productManager.agregarProducto(
    "Samsung S22",
    "Samsung Galaxy S22",
    1000,
    "https://images.samsung.com/ar/smartphones/galaxy-s22/buy/S22plus_ColorSelection_Pinkgold_MO.jpg",
    "2414",
    10
  );
  productManager.agregarProducto(
    "iPhone 14",
    "Apple iPhone 14",
    1600,
    "https://http2.mlstatic.com/D_NQ_NP_651710-MLM51559386433_092022-V.jpg",
    "1312",
    10
  );
  
  console.log(productManager.getProducts());
  
  console.log("Busqueda de producto", productManager.getProductById(2));