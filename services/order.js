const OrderModel = require('../models/Order')
const ProductModel = require('../models/Product')
const { ObjectID } = require('mongodb')
function timGia(id, listFormDB){
    let findProduct = listFormDB.find(element => {
        return element._id == id
    });

    return findProduct.price
}
async function getAllOrder(){
    return OrderModel.find({}).populate('items.idProduct')
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

async function editOder(orderID, productID, updatedProduct) {

    let data = await  OrderModel.updateOne(
        { "_id": orderID, "items._id": productID }, 
        {
            $set: {
                "items.$.quantity": updatedProduct.quantity,
                "items.$.discount": updatedProduct.discount
            }
        }
    );

    // let removeOd = await  OrderModel.deleteOne()

    return data
}

module.exports = {
    addOrder,
    getAllOrder,
    editOder
}