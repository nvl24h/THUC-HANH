const OrderModel = require('../models/Order')
const ProductModel = require('../models/Product')
function timGia(id, listFormDB){
    let findProduct = listFormDB.find(element => {
        return element._id == id
    });

    return findProduct.price
}
async function getAllOrder(){
    return OrderModel.find({})
}

async function addOrder(customer, items){
    let listProductID = items.map(pro=>{
        return pro.idProduct
    })

    let listProduct = await ProductModel.find({
        _id: {$in: listProductID}
    })


    let listItemFull = items.map(element=>{
        element.price = timGia(element.idProduct, listProduct)
        return element
    })
    

    return OrderModel.create({
        customer, 
        items : listItemFull
    })
}

module.exports = {
    addOrder,
    getAllOrder
}