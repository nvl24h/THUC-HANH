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
            required: true,
            ref: 'Product'
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
}, {
    toObject: { virtuals: true },
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            let totalPrice = 0
          ret.items = ret.items.map(item => {
            totalPrice += (item.price * item.quantity) - item.discount
            return {
              ...item,
              finalPrice: (item.price * item.quantity) - item.discount,
            };
          });

          ret.totalPrice = totalPrice
          
          return ret;
        },
      },
    getters: true,
});


const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
