const fs = require('fs').promises;
const { existsSync } = require('fs');
const path = require("path");

class ProductManager{

     constructor(){
        this.path = path.join(__dirname, 'products.json');
    }

    async addProduct(product){
      try{
          const savedProduct = await this.getProducts();
          const verify = savedProduct.find(item => item.code == product.code);
          const objProduct = Object.keys(product);
          if(verify){
              console.error(`Este producto ya existe ${product.code}`)
          }
          if(objProduct.length < 6){
              console.error('Todos los campos deben estar completos');
          }
          const newId = savedProduct.length > 0 ? savedProduct[savedProduct.length -1 ].id + 1 : 1
          const newProduct = {
              id: newId, 
              ...product
          }
          savedProduct.push(newProduct)
          const productList = JSON.stringify(savedProduct, null, '\t')
          await fs.writeFile(this.path, productList)
          console.log(`${product.title} ha sido agregado`)
      }catch(error){
          console.error(error);
      }
  }

async getProducts(){
    try{
        if (existsSync(this.path)){
            const product = await fs.readFile(this.path, 'utf-8')
            if(product.length > 0){
                const parsedProducts = JSON.parse(product)
                return parsedProducts
            }
            else return []
        }
        else return []
    }
    catch(error){
        console.error(error);
    }
}

async getProductById(id) {
    try{
        const savedProduct = await this.getProducts();
        const selectedProduct = savedProduct.find(prod => prod.id === id)
        if(!selectedProduct){
          console.error('No se encontro el id del product');
        }
        return selectedProduct
    }
    catch(error){
        console.log(error)
    }
}

async updateProduct(id, product) {
    try{
        const savedProduct = await this.getProducts()
        const selectedProduct = await this.getProductById(id)
        if(selectedProduct){
            const updatedProduct = {...selectedProduct, ...product}
            const updatedList = savedProduct.map(prod =>{
                if(prod.id === id){
                    return updatedProduct
                }else{
                    return prod
                }
            })
            const productStrings = JSON.stringify(updatedList, null, '\t')
            await fs.writeFile(this.path, productStrings)
            console.log('product modificado')
        }
    }
    catch(error){
        console.log(error)
    }
}

async deleteProduct(id) {
    try{
        const savedProduct = await this.getProducts();
        const selectedProduct = await this.getProductById(id)
        const filteredProduct = savedProduct.filter(prod => prod.id !== id)
        if(!selectedProduct){
            console.error('No se encuentra el ID especificado')
        }
        else{
            const productStrings = JSON.stringify(filteredProduct, null, '\t')
            await fs.writeFile(this.path, productStrings)
            console.log(`${selectedProduct.title} ha sido eliminado`)
        }
    }
    catch(error){
        console.log(error.message)

    }

}
}

const productManager = new ProductManager();

productManager.addProduct({
    code: 123,
    title: 'Coca Cola',
    description: 'Bebida gaseosa',
    price: 100,
    stock: 10,
    thumbnail: 'https://www.coca-cola.com.ar/content/dam/journey/ar/es/private/brands/coca-cola/coca-cola.png'
    })