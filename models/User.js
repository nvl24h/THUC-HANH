const mongoose = require('../config/dbConnect')
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    image: String,
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    name: String,
    password: {
        type: String,
        require: 'Email address is required'
    },
    coin: {
        type: Number,
        min: 0,
        default: 0
    }
})
userSchema.index({name: 'text', email: 'text'});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel