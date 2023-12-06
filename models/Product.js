const mongoose = require('../config/dbConnect')

const productSchema = new mongoose.Schema({
    name: String,
    service: String,
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    status: Boolean
})


const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel