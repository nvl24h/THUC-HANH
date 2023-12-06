const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
async function createUser(user){
    const { email, password, name } = user;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw {
            status: 400,
            message: 'Email da ton tai'
        }
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo một người dùng mới
    const newUser = new UserModel({
        email,
        password: hashedPassword,
        name
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    return {
        status: 200,
        message: 'Tao thanh cong'
    }
}


module.exports = {
    createUser
}