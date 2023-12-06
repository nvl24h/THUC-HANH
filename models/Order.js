const mongoose = require('../config/dbConnect');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        idProduct: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            default: 0
        }
    }]
});

orderSchema.virtual('items.totalPrice').get(function () {
    return (this.price * this.quantity) - this.discount;
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
