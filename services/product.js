const ProductModel = require('../models/Product')

async function getProducts(page = 1, size = 10) {
    let skip = (page - 1) * size
    let condition = {}

    let products = ProductModel.find(condition).limit(size).skip(skip).lean().exec()
    
    const [ results, itemCount ] = await Promise.all([
        products,
        ProductModel.countDocuments({})
    ]);
    return {
        status: 200,
        data: {
            data: results,
            page: page,
            prev: page - 1 < 0 ? 1 : page - 1,
            next: page + 1,
            total: itemCount
        }
    }

}

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
    deleteProduct,
    getProducts
}