const ProductModel = require('../models/Product')

async function addProduct(product){
    let data = await ProductModel.create(product)
    return data
}

async function putProduct(updatePd) {
    // console.log(updatePd.idProduct);
    let putData = await ProductModel.findOneAndUpdate({ _id : updatePd.idProduct}, updatePd, {new : true})
    return putData
}

async function deleteProduct(deletePd) {
    let deleData = ProductModel.findByIdAndDelete({ _id : deletePd})
    return deleData
}

module.exports = {
    addProduct,
    putProduct,
    deleteProduct
}