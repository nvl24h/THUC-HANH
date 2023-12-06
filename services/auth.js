const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fs = require('fs'); 
const path = require('path')
const privateKey = fs.readFileSync(path.join(__dirname, '../key/private-key.pem'), 'utf8');
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

async function login(data){
    const { email, password } = data;
    // Tìm kiếm người dùng theo email
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw { status: 400, message: 'K tim thay email' }
    }

    // Kiểm tra mật khẩu sử dụng bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw { status: 400, message: 'Mat khau sai' }
    }

    // Tạo JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1h' // Thời gian hết hạn của token,
    });

    // Trả về token cho người dùng
    return { token, userId: user._id, expiresIn: 3600 }
}


module.exports = {
    createUser,
    login
}