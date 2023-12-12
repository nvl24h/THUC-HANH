const ProductModel = require('../models/Product')

async function addProduct(product){
    let data = await ProductModel.create(product)
    return data
}

module.exports = {
    addProduct
}