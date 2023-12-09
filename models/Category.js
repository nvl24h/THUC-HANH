const mongoose = require('../config/dbConnect')

const catSchema = new mongoose.Schema({
    name: String,
    parent: {
      type:   mongoose.SchemaTypes.ObjectId,
      ref: 'Category'
    },
})


const CategoryModel = mongoose.model('Category', catSchema);

module.exports = CategoryModel